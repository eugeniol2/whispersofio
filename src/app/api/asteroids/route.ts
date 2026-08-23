import { NextResponse } from 'next/server'

import { getAsteroidFeed } from '@/services/api/asteroids/server'
import type { AsteroidRange } from '@/services/api/asteroids/types'
import { ApiError } from '@/services/api/client'

const VALID_RANGES: AsteroidRange[] = ['today', '3days', '7days']

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const range = searchParams.get('range') as AsteroidRange | null

  if (!range || !VALID_RANGES.includes(range)) {
    return NextResponse.json({ error: 'Invalid range' }, { status: 400 })
  }

  try {
    const result = await getAsteroidFeed(range)
    const cached = result.cacheAgeSeconds !== null

    return NextResponse.json(result.data, {
      headers: {
        'X-Cache': cached ? 'HIT' : 'MISS',
        ...(cached
          ? { 'X-Cache-Age-Seconds': String(result.cacheAgeSeconds) }
          : {})
      }
    })
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502
    return NextResponse.json(
      { error: 'Failed to fetch asteroid data' },
      { status }
    )
  }
}
