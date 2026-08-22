import { NextResponse } from 'next/server'

import { EONET_BASE_URL } from '@/services/api/endpoints'
import { createServerCache } from '@/services/api/serverCache'

const REVALIDATE_MS = 60 * 60 * 1000
const ACTIVITY_LIMIT = 5

export interface DashboardActivityPayload {
  id: string
  title: string
  date: string
}

const activityCache = createServerCache<DashboardActivityPayload[]>(REVALIDATE_MS)

interface EonetEvent {
  id: string
  title: string
  geometry: { date: string }[]
}

interface EonetEventsResponse {
  events: EonetEvent[]
}

export async function GET() {
  const hit = activityCache.get()

  if (hit) {
    return NextResponse.json(hit.data, {
      headers: {
        'X-Cache': 'HIT',
        'X-Cache-Age-Seconds': String(hit.ageSeconds)
      }
    })
  }

  try {
    const response = await fetch(
      `${EONET_BASE_URL}/events?status=open&limit=20`
    )

    if (!response.ok) {
      throw new Error(`EONET request failed: ${response.status}`)
    }

    const data: EonetEventsResponse = await response.json()

    const activity = data.events
      .map(event => ({
        id: event.id,
        title: event.title,
        date: event.geometry[event.geometry.length - 1]?.date
      }))
      .filter((item): item is DashboardActivityPayload => Boolean(item.date))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, ACTIVITY_LIMIT)

    activityCache.set(activity)

    return NextResponse.json(activity, { headers: { 'X-Cache': 'MISS' } })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch recent activity' },
      { status: 502 }
    )
  }
}
