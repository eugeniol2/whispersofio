import { NextResponse } from 'next/server'

import { ApiError } from '@/services/api/client'
import {
  fetchAvailableCategoryIds,
  fetchEonetCategories
} from '@/services/api/eonet/requests'
import type {
  EonetStatusFilter,
  EonetTimeRange
} from '@/services/api/eonet/types'

const STATUSES: EonetStatusFilter[] = ['open', 'closed', 'all']
const TIME_RANGES: EonetTimeRange[] = ['today', 'week', 'month', 'all']

// Working out which categories have events costs one probe per category. Doing
// that from the browser burned 13 of EONET's 60 requests per minute on every
// filter change; here the Next data cache absorbs the repeats for everyone.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') as EonetStatusFilter
  const timeRange = searchParams.get('timeRange') as EonetTimeRange

  if (!STATUSES.includes(status) || !TIME_RANGES.includes(timeRange)) {
    return NextResponse.json({ error: 'Invalid params' }, { status: 400 })
  }

  try {
    const categories = await fetchEonetCategories()
    const available = await fetchAvailableCategoryIds({
      status,
      timeRange,
      categoryIds: categories.map(category => category.id)
    })

    return NextResponse.json(available)
  } catch (error) {
    // 429 has to survive the hop so the client can back off instead of failing.
    const upstream = error instanceof ApiError ? error.status : 502
    return NextResponse.json(
      { error: 'Failed to fetch category availability' },
      { status: upstream === 429 ? 429 : 502 }
    )
  }
}
