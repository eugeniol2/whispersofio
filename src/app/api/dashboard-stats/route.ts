import { NextResponse } from 'next/server'

import { apiClient, ApiError } from '@/services/api/client'
import { EONET_BASE_URL } from '@/services/api/endpoints'
import { createServerCache } from '@/services/api/serverCache'

const REVALIDATE_MS = 60 * 60 * 1000

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
  const response = await fetch(`${EONET_BASE_URL}/events?status=open`)

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
    params: { start_date: today, end_date: today }
  })
  return data.element_count
}

interface MarsManifestResponse {
  photo_manifest: { total_photos: number }
}

async function fetchMarsPhotosTotal(): Promise<number> {
  const data = await apiClient<MarsManifestResponse>(
    '/mars-photos/api/v1/manifests/curiosity'
  )
  return data.photo_manifest.total_photos
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
