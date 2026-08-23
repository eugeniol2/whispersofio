import { NextResponse } from 'next/server'

import { getRoverInfo } from '@/services/api/marsRover/server'
import type { RoverName } from '@/services/api/marsRover/types'

const VALID_ROVERS: RoverName[] = ['curiosity', 'perseverance']

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rover = searchParams.get('rover') as RoverName | null

  if (!rover || !VALID_ROVERS.includes(rover)) {
    return NextResponse.json({ error: 'Invalid rover' }, { status: 400 })
  }

  const result = await getRoverInfo(rover)

  if (!result) {
    return NextResponse.json(
      { error: 'No recent imagery found for this rover' },
      { status: 502 }
    )
  }

  const cached = result.cacheAgeSeconds !== null

  return NextResponse.json(result.data, {
    headers: {
      'X-Cache': cached ? 'HIT' : 'MISS',
      ...(cached
        ? { 'X-Cache-Age-Seconds': String(result.cacheAgeSeconds) }
        : {})
    }
  })
}
