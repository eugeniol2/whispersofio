import { ApiError } from '../client'
import {
  mockDashboardActivity,
  mockDashboardApiCollections,
  mockDashboardStats
} from './mockData'
import type {
  DashboardActivityItem,
  DashboardApiCollection,
  DashboardFeaturedContent,
  DashboardStat
} from './types'

// The dashboard aggregates data from several NASA endpoints (APOD, EONET,
// Mars rover photos, NeoWs). Each export below already has the async shape
// a real request would have, so wiring in the real calls later is a
// drop-in change per section — no changes needed in the feature components.
// Featured Content is already live (see below); the rest are still mock.

const MOCK_LATENCY_MS = 400

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchDashboardStats(): Promise<DashboardStat[]> {
  await delay(MOCK_LATENCY_MS)
  return mockDashboardStats
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

export async function fetchDashboardActivity(): Promise<
  DashboardActivityItem[]
> {
  await delay(MOCK_LATENCY_MS)
  return mockDashboardActivity
}
