import { ApiError } from '../client'
import { EONET_BASE_URL } from '../endpoints'
import type { EonetCategory, EonetEvent, EonetStatusFilter } from './types'

// EONET needs no API key, so — unlike Apod/Dashboard — these calls go
// straight from the browser rather than through one of our own cached
// Route Handlers. There's no secret to protect, and the status/category
// filter surface means many distinct queries rather than one canonical
// value worth server-caching; React Query's own per-query client cache
// is the right fit here.

// EONET has ~7,000 open events with no limit param — unbounded here would
// mean fetching and rendering all of them as full cards.
const EVENTS_LIMIT = 30

export async function fetchEonetCategories(): Promise<EonetCategory[]> {
  const response = await fetch(`${EONET_BASE_URL}/categories`)

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch EONET categories')
  }

  const data: { categories: EonetCategory[] } = await response.json()
  return data.categories
}

interface FetchEonetEventsParams {
  status: EonetStatusFilter
  categoryId?: string
}

export async function fetchEonetEvents({
  status,
  categoryId
}: FetchEonetEventsParams): Promise<EonetEvent[]> {
  const url = new URL(`${EONET_BASE_URL}/events`)
  url.searchParams.set('limit', String(EVENTS_LIMIT))
  if (status !== 'all') url.searchParams.set('status', status)
  if (categoryId) url.searchParams.set('category', categoryId)

  const response = await fetch(url)

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch EONET events')
  }

  const data: { events: EonetEvent[] } = await response.json()
  return data.events
}
