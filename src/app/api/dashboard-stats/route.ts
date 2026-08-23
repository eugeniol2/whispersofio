import { NextResponse } from 'next/server'

import { ApiError } from '@/services/api/client'
import { getDashboardStats } from '@/services/api/dashboard/statsServer'

export async function GET() {
  try {
    const result = await getDashboardStats()
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
      { error: 'Failed to fetch dashboard stats' },
      { status }
    )
  }
}
