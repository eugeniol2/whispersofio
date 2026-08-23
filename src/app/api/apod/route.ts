import { NextResponse } from 'next/server'

import { getApod } from '@/services/api/apod/server'
import { ApiError } from '@/services/api/client'

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const random = searchParams.get('random')

  const invalidDate = [date, start, end].some(
    value => value !== null && !DATE_PATTERN.test(value)
  )

  if (invalidDate || Boolean(start) !== Boolean(end)) {
    return NextResponse.json({ error: 'Invalid params' }, { status: 400 })
  }

  try {
    const result = await getApod({
      date,
      start,
      end,
      random: Boolean(random)
    })
    const cached = result.cacheAgeSeconds !== null

    return NextResponse.json(result.data, {
      headers: {
        'X-Cache': cached ? 'HIT' : 'MISS',
        ...(cached
          ? { 'X-Cache-Age-Seconds': String(result.cacheAgeSeconds) }
          : {}),
        // Keeps a CDN or the browser from pinning one random pick.
        ...(random ? { 'Cache-Control': 'no-store' } : {})
      }
    })
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502
    return NextResponse.json({ error: 'Failed to fetch APOD' }, { status })
  }
}
