import { NextResponse } from 'next/server'

import type { AsteroidVisibility } from '@/services/api/asteroids/types'
import { HORIZONS_API_URL } from '@/services/api/endpoints'
import { createKeyedServerCache } from '@/services/api/serverCache'

const REVALIDATE_MS = 6 * 60 * 60 * 1000
const HORIZONS_TIMEOUT_MS = 20000

const visibilityCache = createKeyedServerCache<AsteroidVisibility>(
  REVALIDATE_MS,
  200
)

interface HorizonsResponse {
  result?: string
}

interface EphemerisRow {
  observedAt: string
  rightAscension: string
  declination: number
  magnitude: number | null
}

// Rows look like:
//  2026-Aug-22 00:00     15 43 23.05 +26 20 04.4   19.366    n.a.
// Magnitude is sometimes "n.a." and sometimes written without decimals ("20.").
const ROW_PATTERN =
  /^\s*(\d{4}-\w{3}-\d{2}\s+\d{2}:\d{2})\s+(\d{2} \d{2} \d{2}\.\d+)\s+([+-]\d{2}) (\d{2}) (\d{2}\.\d+)\s+(n\.a\.|[\d.]+)/

function parseEphemeris(result: string): EphemerisRow[] {
  const start = result.indexOf('$$SOE')
  const end = result.indexOf('$$EOE')
  if (start === -1 || end === -1) return []

  return result
    .slice(start + 5, end)
    .split('\n')
    .map(line => {
      const match = ROW_PATTERN.exec(line)
      if (!match) return null

      const [, observedAt, rightAscension, degrees, minutes, seconds, mag] =
        match
      const sign = degrees.startsWith('-') ? -1 : 1
      const declination =
        sign *
        (Math.abs(Number(degrees)) + Number(minutes) / 60 + Number(seconds) / 3600)

      return {
        observedAt,
        rightAscension,
        declination,
        magnitude: mag === 'n.a.' ? null : Number(mag)
      }
    })
    .filter((row): row is EphemerisRow => row !== null)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const date = searchParams.get('date')

  if (!id || !/^\d+$/.test(id) || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid params' }, { status: 400 })
  }

  const cacheKey = `${id}:${date}`
  const hit = visibilityCache.get(cacheKey)

  if (hit) {
    return NextResponse.json(hit.data, {
      headers: {
        'X-Cache': 'HIT',
        'X-Cache-Age-Seconds': String(hit.ageSeconds)
      }
    })
  }

  const stop = new Date(`${date}T00:00:00Z`)
  stop.setUTCDate(stop.getUTCDate() + 1)

  const url = new URL(HORIZONS_API_URL)
  url.searchParams.set('format', 'json')

  // Horizons parses these values itself and requires the literal single quotes,
  // otherwise the comma in QUANTITIES is read as separate settings.
  const quoted: Record<string, string> = {
    COMMAND: `DES=${id};`,
    OBJ_DATA: 'NO',
    MAKE_EPHEM: 'YES',
    EPHEM_TYPE: 'OBSERVER',
    CENTER: '500@399',
    START_TIME: date,
    STOP_TIME: stop.toISOString().slice(0, 10),
    STEP_SIZE: '1h',
    QUANTITIES: '1,9'
  }

  for (const [key, value] of Object.entries(quoted)) {
    url.searchParams.set(key, `'${value}'`)
  }

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(HORIZONS_TIMEOUT_MS)
    })

    if (!response.ok) {
      throw new Error(`Horizons request failed: ${response.status}`)
    }

    const data: HorizonsResponse = await response.json()
    const rows = parseEphemeris(data.result ?? '')

    if (rows.length === 0) {
      const unknown: AsteroidVisibility = {
        magnitude: null,
        declination: null,
        rightAscension: null,
        observedAt: null
      }
      visibilityCache.set(cacheKey, unknown)
      return NextResponse.json(unknown, { headers: { 'X-Cache': 'MISS' } })
    }

    // Peak brightness during the approach is what decides whether it can be
    // seen at all, so report the brightest row rather than a fixed hour.
    const rated = rows.filter(row => row.magnitude !== null)
    const brightest = rated.length
      ? rated.reduce((best, row) =>
          (row.magnitude as number) < (best.magnitude as number) ? row : best
        )
      : rows[0]

    const visibility: AsteroidVisibility = {
      magnitude: brightest.magnitude,
      declination: brightest.declination,
      rightAscension: brightest.rightAscension,
      observedAt: brightest.observedAt
    }

    visibilityCache.set(cacheKey, visibility)

    return NextResponse.json(visibility, { headers: { 'X-Cache': 'MISS' } })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch visibility data' },
      { status: 502 }
    )
  }
}
