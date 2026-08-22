import { NextResponse } from 'next/server'

import { apiClient, ApiError } from '@/services/api/client'

// APOD only publishes once a day, so there's no reason to hit NASA on
// every request. This is a simple in-process cache (not Next's fetch
// Data Cache, whose hit/miss state isn't observable from the response) —
// deliberately explicit so X-Cache below reflects what actually happened.
// Note: being in-process, it resets on server restart and isn't shared
// across multiple server instances if this is ever deployed behind
// horizontal scaling — fine for a single dev/`next start` process.
const REVALIDATE_MS = 60 * 60 * 4 * 1000

let cachedApod: { data: unknown; fetchedAt: number } | null = null

const getYesterdayDateString = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().slice(0, 10)
}

export async function GET() {
  const now = Date.now()

  if (cachedApod && now - cachedApod.fetchedAt < REVALIDATE_MS) {
    const ageSeconds = Math.floor((now - cachedApod.fetchedAt) / 1000)
    return NextResponse.json(cachedApod.data, {
      headers: { 'X-Cache': 'HIT', 'X-Cache-Age-Seconds': String(ageSeconds) }
    })
  }

  try {
    const apod = await apiClient('/planetary/apod', {
      params: { date: getYesterdayDateString() }
    })

    cachedApod = { data: apod, fetchedAt: now }

    return NextResponse.json(apod, { headers: { 'X-Cache': 'MISS' } })
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502
    return NextResponse.json({ error: 'Failed to fetch APOD' }, { status })
  }
}
