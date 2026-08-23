import { EONET_BASE_URL } from '../endpoints'
import { createServerCache } from '../serverCache'
import type { DashboardActivityResponse } from './requests'

const REVALIDATE_MS = 60 * 60 * 1000
const ACTIVITY_LIMIT = 5

const UPSTREAM_CACHE_SECONDS = 60 * 60
const activityCache =
  createServerCache<DashboardActivityResponse[]>(REVALIDATE_MS)

interface EonetEvent {
  id: string
  title: string
  categories: { id: string; title: string }[]
  geometry: { date: string }[]
}

export interface DashboardActivityResult {
  data: DashboardActivityResponse[]
  cacheAgeSeconds: number | null
}

export async function getDashboardActivity(): Promise<DashboardActivityResult> {
  const hit = activityCache.get()
  if (hit) return { data: hit.data, cacheAgeSeconds: hit.ageSeconds }

  const response = await fetch(`${EONET_BASE_URL}/events?status=open&limit=20`, {
    next: { revalidate: UPSTREAM_CACHE_SECONDS }
  })

  if (!response.ok) {
    throw new Error(`EONET request failed: ${response.status}`)
  }

  const data: { events: EonetEvent[] } = await response.json()

  const activity = data.events
    .map(event => ({
      id: event.id,
      title: event.title,
      categoryId: event.categories[0]?.id ?? 'unknown',
      categoryLabel: event.categories[0]?.title ?? 'Earth Event',
      date: event.geometry[event.geometry.length - 1]?.date
    }))
    .filter((item): item is DashboardActivityResponse => Boolean(item.date))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, ACTIVITY_LIMIT)

  activityCache.set(activity)

  return { data: activity, cacheAgeSeconds: null }
}
