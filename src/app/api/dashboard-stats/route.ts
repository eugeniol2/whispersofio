import { NextResponse } from 'next/server'

import { apiClient, ApiError } from '@/services/api/client'
import {
  EONET_BASE_URL,
  MARS_RAW_IMAGES_BASE_URL
} from '@/services/api/endpoints'
import { createServerCache } from '@/services/api/serverCache'

const REVALIDATE_MS = 60 * 60 * 1000
const UPSTREAM_CACHE_SECONDS = 60 * 60
const EARTH_EVENTS_WINDOW_DAYS = 30

interface DashboardStatsPayload {
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
    throw new ApiError(response.status, `EONET request failed: ${response.status}`)
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

export async function GET() {
  const hit = statsCache.get()

  if (hit) {
    return NextResponse.json(hit.data, {
      headers: {
        'X-Cache': 'HIT',
        'X-Cache-Age-Seconds': String(hit.ageSeconds)
      }
    })
  }

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

  if (data.earthEvents === null && data.nearAsteroids === null && data.marsPhotos === null) {
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 502 }
    )
  }

  statsCache.set(data)

  return NextResponse.json(data, { headers: { 'X-Cache': 'MISS' } })
}
