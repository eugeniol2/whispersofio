import { formatRelativeTime } from '@/utils/formatRelativeTime'

import { ApiError } from '../client'
import { mockDashboardApiCollections } from './mockData'
import type {
  DashboardActivityItem,
  DashboardApiCollection,
  DashboardFeaturedContent,
  DashboardStat
} from './types'

const MOCK_LATENCY_MS = 400

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export interface DashboardStatsResponse {
  earthEvents: number | null
  nearAsteroids: number | null
  marsPhotos: number | null
}

export async function fetchDashboardStats(): Promise<DashboardStat[]> {
  const response = await fetch('/api/dashboard-stats')

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch dashboard stats')
  }

  return toDashboardStats(await response.json())
}

export function toDashboardStats(
  data: DashboardStatsResponse
): DashboardStat[] {
  const stats: DashboardStat[] = []

  if (data.earthEvents !== null) {
    stats.push({
      id: 'earth-events',
      icon: 'earthEvents',
      value: data.earthEvents.toLocaleString('en-US'),
      label: 'Earth Events (30d)'
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

export interface NasaApodApiResponse {
  date: string
  title: string
  explanation: string
  media_type: 'image' | 'video'
  url: string
  hdurl?: string
  thumbnail_url?: string
  copyright?: string
}

export async function fetchDashboardFeaturedContent(): Promise<DashboardFeaturedContent> {
  const response = await fetch('/api/apod')

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch APOD')
  }

  const apod: NasaApodApiResponse = await response.json()

  return toDashboardFeaturedContent(apod)
}

export function toDashboardFeaturedContent(
  apod: NasaApodApiResponse
): DashboardFeaturedContent {
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
    thumbnailUrl: apod.thumbnail_url ?? null,
    credit: apod.copyright?.trim() || null,
    href: '/apod'
  }
}

export async function fetchDashboardApiCollections(): Promise<
  DashboardApiCollection[]
> {
  await delay(MOCK_LATENCY_MS)
  return mockDashboardApiCollections
}

export interface DashboardActivityResponse {
  id: string
  title: string
  categoryId: string
  categoryLabel: string
  date: string
}

export async function fetchDashboardActivity(): Promise<
  DashboardActivityItem[]
> {
  const response = await fetch('/api/dashboard-activity')

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch recent activity')
  }

  const data: DashboardActivityResponse[] = await response.json()

  return toDashboardActivity(data)
}

export function toDashboardActivity(
  data: DashboardActivityResponse[]
): DashboardActivityItem[] {
  return data.map(item => ({
    id: item.id,
    categoryId: item.categoryId,
    categoryLabel: item.categoryLabel,
    title: item.title,
    timestamp: formatRelativeTime(item.date)
  }))
}
