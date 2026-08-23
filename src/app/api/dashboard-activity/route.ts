import { NextResponse } from 'next/server'

import { getDashboardActivity } from '@/services/api/dashboard/server'

export async function GET() {
  try {
    const result = await getDashboardActivity()
    const cached = result.cacheAgeSeconds !== null

    return NextResponse.json(result.data, {
      headers: {
        'X-Cache': cached ? 'HIT' : 'MISS',
        ...(cached
          ? { 'X-Cache-Age-Seconds': String(result.cacheAgeSeconds) }
          : {})
      }
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch recent activity' },
      { status: 502 }
    )
  }
}
