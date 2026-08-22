import {
  mockDashboardActivity,
  mockDashboardApiCollections,
  mockDashboardFeaturedContent,
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

const MOCK_LATENCY_MS = 400

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchDashboardStats(): Promise<DashboardStat[]> {
  await delay(MOCK_LATENCY_MS)
  return mockDashboardStats
}

export async function fetchDashboardFeaturedContent(): Promise<DashboardFeaturedContent> {
  await delay(MOCK_LATENCY_MS)
  return mockDashboardFeaturedContent
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
