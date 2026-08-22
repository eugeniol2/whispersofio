import { formatRelativeTime } from '@/utils/formatRelativeTime'

import { ApiError } from '../client'
import { mockDashboardApiCollections } from './mockData'
import type {
  DashboardActivityItem,
  DashboardApiCollection,
  DashboardFeaturedContent,
  DashboardStat
} from './types'

// The dashboard aggregates data from several NASA endpoints (APOD, EONET,
// Mars rover photos, NeoWs). Featured Content, Stats, and Activity are
// already live (see below); only API Collections is still mock.

const MOCK_LATENCY_MS = 400

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

interface DashboardStatsResponse {
  earthEvents: number | null
  nearAsteroids: number | null
  marsPhotos: number | null
}

export async function fetchDashboardStats(): Promise<DashboardStat[]> {
  const response = await fetch('/api/dashboard-stats')

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch dashboard stats')
  }

  const data: DashboardStatsResponse = await response.json()
  const stats: DashboardStat[] = []

  // Each source is fetched independently server-side (see /api/dashboard-stats)
  // and can fail on its own — only include stats that actually came back.
  if (data.earthEvents !== null) {
    stats.push({
      id: 'earth-events',
      icon: 'earthEvents',
      value: data.earthEvents.toLocaleString('en-US'),
      label: 'Earth Events'
    })
  }
  if (data.nearAsteroids !== null) {
    stats.push({
      id: 'near-asteroids',
      icon: 'asteroids',
      value: data.nearAsteroids.toLocaleString('en-US'),
      label: 'Near Asteroids'
    })
  }
  if (data.marsPhotos !== null) {
    stats.push({
      id: 'mars-photos',
      icon: 'marsRover',
      value: data.marsPhotos.toLocaleString('en-US'),
      label: 'Mars Photos'
    })
  }

  return stats
}

interface NasaApodApiResponse {
  date: string
  title: string
  explanation: string
  media_type: 'image' | 'video'
  url: string
  hdurl?: string
}

export async function fetchDashboardFeaturedContent(): Promise<DashboardFeaturedContent> {
  // Goes through our own /api/apod route rather than calling NASA
  // directly from the browser — that route caches the upstream response
  // server-side (see REVALIDATE_SECONDS there), so every visitor shares
  // one NASA request per revalidation window instead of one each.
  const response = await fetch('/api/apod')

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch APOD')
  }

  const apod: NasaApodApiResponse = await response.json()

  return {
    badge: 'APOD',
    date: new Date(apod.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    title: apod.title,
    description: apod.explanation,
    imageLabel: apod.title,
    mediaType: apod.media_type,
    mediaUrl: apod.media_type === 'image' ? (apod.hdurl ?? apod.url) : apod.url,
    href: '/apod'
  }
}

export async function fetchDashboardApiCollections(): Promise<
  DashboardApiCollection[]
> {
  await delay(MOCK_LATENCY_MS)
  return mockDashboardApiCollections
}

interface DashboardActivityResponse {
  id: string
  title: string
  date: string
  url: string
}

export async function fetchDashboardActivity(): Promise<
  DashboardActivityItem[]
> {
  const response = await fetch('/api/dashboard-activity')

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch recent activity')
  }

  const data: DashboardActivityResponse[] = await response.json()

  return data.map(item => ({
    id: item.id,
    icon: 'earthEvents',
    title: item.title,
    timestamp: formatRelativeTime(item.date),
    url: item.url
  }))
}
