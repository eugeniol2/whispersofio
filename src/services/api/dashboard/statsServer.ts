import { apiClient, ApiError } from '../client'
import { EONET_BASE_URL, MARS_RAW_IMAGES_BASE_URL } from '../endpoints'
import { createServerCache } from '../serverCache'

const REVALIDATE_MS = 60 * 60 * 1000
const UPSTREAM_CACHE_SECONDS = 60 * 60
const EARTH_EVENTS_WINDOW_DAYS = 30

export interface DashboardStatsPayload {
  earthEvents: number | null
  nearAsteroids: number | null
  marsPhotos: number | null
}

const statsCache = createServerCache<DashboardStatsPayload>(REVALIDATE_MS)

interface EonetEventsResponse {
  events: unknown[]
}

async function fetchEarthEventsCount(): Promise<number> {
  const response = await fetch(
    `${EONET_BASE_URL}/events?status=open&days=${EARTH_EVENTS_WINDOW_DAYS}`,
    {
      next: { revalidate: UPSTREAM_CACHE_SECONDS }
    }
  )

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `EONET request failed: ${response.status}`
    )
  }

  const data: EonetEventsResponse = await response.json()
  return data.events.length
}

interface NeoFeedResponse {
  element_count: number
}

async function fetchNearAsteroidsCount(): Promise<number> {
  const today = new Date().toISOString().slice(0, 10)
  const data = await apiClient<NeoFeedResponse>('/neo/rest/v1/feed', {
    params: { start_date: today, end_date: today },
    revalidate: UPSTREAM_CACHE_SECONDS
  })
  return data.element_count
}

interface MarsRawImagesResponse {
  total_images: number
}

async function fetchMarsPhotosTotal(): Promise<number> {
  const url = new URL(MARS_RAW_IMAGES_BASE_URL)
  url.searchParams.set('feed', 'raw_images')
  url.searchParams.set('feedtype', 'json')
  url.searchParams.set('category', 'mars2020')
  url.searchParams.set('num', '1')

  const response = await fetch(url, {
    next: { revalidate: UPSTREAM_CACHE_SECONDS }
  })

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Mars raw images request failed: ${response.status}`
    )
  }

  const data: MarsRawImagesResponse = await response.json()
  return data.total_images
}

export interface DashboardStatsResult {
  data: DashboardStatsPayload
  cacheAgeSeconds: number | null
}

// Shared by the route handler and the dashboard's SSR seeding so a cold visit
// does not fetch what the page already rendered with.
export async function getDashboardStats(): Promise<DashboardStatsResult> {
  const hit = statsCache.get()
  if (hit) return { data: hit.data, cacheAgeSeconds: hit.ageSeconds }

  const [earthEvents, nearAsteroids, marsPhotos] = await Promise.allSettled([
    fetchEarthEventsCount(),
    fetchNearAsteroidsCount(),
    fetchMarsPhotosTotal()
  ])

  const data: DashboardStatsPayload = {
    earthEvents: earthEvents.status === 'fulfilled' ? earthEvents.value : null,
    nearAsteroids:
      nearAsteroids.status === 'fulfilled' ? nearAsteroids.value : null,
    marsPhotos: marsPhotos.status === 'fulfilled' ? marsPhotos.value : null
  }

  if (
    data.earthEvents === null &&
    data.nearAsteroids === null &&
    data.marsPhotos === null
  ) {
    throw new ApiError(502, 'Failed to fetch dashboard stats')
  }

  statsCache.set(data)

  return { data, cacheAgeSeconds: null }
}
