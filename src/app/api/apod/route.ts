import { NextResponse } from 'next/server'

import { apiClient, ApiError } from '@/services/api/client'
import { createKeyedServerCache } from '@/services/api/serverCache'

const REVALIDATE_MS = 60 * 60 * 4 * 1000
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const apodCache = createKeyedServerCache<unknown>(REVALIDATE_MS, 60)

const HEAD_TIMEOUT_MS = 6000

const getYesterdayDateString = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().slice(0, 10)
}

interface ApodItem {
  media_type?: string
  url?: string
  thumbnail_url?: string
  video_size_bytes?: number | null
}

// APOD serves mp4 videos without a thumbnail, and the browser has to download
// the whole file to paint a frame. Measuring each one lets the client skip that
// for the large ones instead of quietly pulling tens of megabytes.
async function attachVideoSizes(payload: unknown): Promise<unknown> {
  const items = (Array.isArray(payload) ? payload : [payload]) as ApodItem[]

  const targets = items.filter(
    item =>
      item?.media_type === 'video' &&
      typeof item.url === 'string' &&
      item.url.endsWith('.mp4')
  )

  if (targets.length === 0) return payload

  await Promise.allSettled(
    targets.map(async item => {
      try {
        const response = await fetch(item.url as string, {
          method: 'HEAD',
          signal: AbortSignal.timeout(HEAD_TIMEOUT_MS)
        })
        const length = response.headers.get('content-length')
        item.video_size_bytes = length ? Number(length) : null
      } catch {
        item.video_size_bytes = null
      }
    })
  )

  return payload
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const random = searchParams.get('random')

  const invalidDate = [date, start, end].some(
    value => value !== null && !DATE_PATTERN.test(value)
  )

  if (invalidDate || (Boolean(start) !== Boolean(end))) {
    return NextResponse.json({ error: 'Invalid params' }, { status: 400 })
  }

  const params: Record<string, string> = {}
  let cacheKey: string | null = null

  if (random) {
    // A cached random pick would stop being random.
    params.count = '1'
  } else if (start && end) {
    params.start_date = start
    params.end_date = end
    params.thumbs = 'true'
    cacheKey = `range:${start}:${end}`
  } else {
    // NASA has intermittently failed to resolve "today" on its side, so the
    // date is always sent explicitly.
    params.date = date ?? getYesterdayDateString()
    params.thumbs = 'true'
    cacheKey = `date:${params.date}`
  }

  if (cacheKey) {
    const hit = apodCache.get(cacheKey)

    if (hit) {
      return NextResponse.json(hit.data, {
        headers: {
          'X-Cache': 'HIT',
          'X-Cache-Age-Seconds': String(hit.ageSeconds)
        }
      })
    }
  }

  try {
    const apod = await attachVideoSizes(
      await apiClient('/planetary/apod', { params })
    )

    if (cacheKey) apodCache.set(cacheKey, apod)

    return NextResponse.json(apod, {
      headers: { 'X-Cache': cacheKey ? 'MISS' : 'BYPASS' }
    })
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502
    return NextResponse.json({ error: 'Failed to fetch APOD' }, { status })
  }
}
