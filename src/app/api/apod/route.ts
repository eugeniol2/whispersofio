import { NextResponse } from 'next/server'

import { apiClient, ApiError } from '@/services/api/client'
import { createServerCache } from '@/services/api/serverCache'

const REVALIDATE_MS = 60 * 60 * 4 * 1000

const apodCache = createServerCache<unknown>(REVALIDATE_MS)

const getYesterdayDateString = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().slice(0, 10)
}

export async function GET() {
  const hit = apodCache.get()

  if (hit) {
    return NextResponse.json(hit.data, {
      headers: {
        'X-Cache': 'HIT',
        'X-Cache-Age-Seconds': String(hit.ageSeconds)
      }
    })
  }

  try {
    const apod = await apiClient('/planetary/apod', {
      params: { date: getYesterdayDateString() }
    })

    apodCache.set(apod)

    return NextResponse.json(apod, { headers: { 'X-Cache': 'MISS' } })
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502
    return NextResponse.json({ error: 'Failed to fetch APOD' }, { status })
  }
}
