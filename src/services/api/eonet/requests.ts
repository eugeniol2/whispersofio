import { ApiError } from '../client'
import { EONET_BASE_URL } from '../endpoints'
import type {
  EonetCategory,
  EonetCategoryId,
  EonetEvent,
  EonetLimit,
  EonetStatusFilter,
  EonetTimeRange
} from './types'

// EONET needs no API key, so — unlike Apod/Dashboard — these calls go
// straight from the browser rather than through one of our own cached
// Route Handlers. There's no secret to protect, and the status/category
// filter surface means many distinct queries rather than one canonical
// value worth server-caching; React Query's own per-query client cache
// is the right fit here.

const TIME_RANGE_DAYS: Record<Exclude<EonetTimeRange, 'all'>, number> = {
  today: 1,
  week: 7,
  month: 30
}

export async function fetchEonetCategories(
  signal?: AbortSignal
): Promise<EonetCategory[]> {
  const response = await fetch(`${EONET_BASE_URL}/categories`, { signal })

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch EONET categories')
  }

  const data: { categories: EonetCategory[] } = await response.json()
  return data.categories
}

interface FetchEonetEventsParams {
  status: EonetStatusFilter
  categoryId?: string
  // EONET has ~7,000 open events with no limit param — 'unlimited' fetches
  // and renders all of them, so it's an explicit opt-in, not the default.
  // Widened beyond EonetLimit's UI options so category-availability probes
  // below can pass limit: 1.
  limit: EonetLimit | number
  timeRange: EonetTimeRange
  signal?: AbortSignal
}

export async function fetchEonetEvents({
  status,
  categoryId,
  limit,
  timeRange,
  signal
}: FetchEonetEventsParams): Promise<EonetEvent[]> {
  const url = new URL(`${EONET_BASE_URL}/events`)
  if (limit !== 'unlimited') url.searchParams.set('limit', String(limit))
  if (status !== 'all') url.searchParams.set('status', status)
  if (categoryId) url.searchParams.set('category', categoryId)
  if (timeRange !== 'all') {
    url.searchParams.set('days', String(TIME_RANGE_DAYS[timeRange]))
  }

  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch EONET events')
  }

  const data: { events: EonetEvent[] } = await response.json()
  return data.events
}

export async function fetchEonetEventById(
  id: string,
  signal?: AbortSignal
): Promise<EonetEvent> {
  const response = await fetch(`${EONET_BASE_URL}/events/${id}`, { signal })

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch EONET event')
  }

  return response.json()
}

interface FetchAvailableCategoryIdsParams {
  status: EonetStatusFilter
  timeRange: EonetTimeRange
  categoryIds: EonetCategoryId[]
  signal?: AbortSignal
}

// EONET has no "counts per category" endpoint, so this probes each
// category with a cheap limit:1 request in parallel and keeps only the
// ones that actually return a result under the current status/time range.
export async function fetchAvailableCategoryIds({
  status,
  timeRange,
  categoryIds,
  signal
}: FetchAvailableCategoryIdsParams): Promise<EonetCategoryId[]> {
  const results = await Promise.all(
    categoryIds.map(async categoryId => {
      const events = await fetchEonetEvents({
        status,
        categoryId,
        limit: 1,
        timeRange,
        signal
      })
      return events.length > 0 ? categoryId : null
    })
  )

  return results.filter((id): id is EonetCategoryId => id !== null)
}
