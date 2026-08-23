import { apiClient } from '../client'
import { createKeyedServerCache } from '../serverCache'
import type { Asteroid, AsteroidFeed, AsteroidRange } from './types'

const REVALIDATE_MS = 60 * 60 * 1000

const RANGE_DAYS: Record<AsteroidRange, number> = {
  today: 0,
  '3days': 2,
  '7days': 6
}

const feedCache = createKeyedServerCache<AsteroidFeed>(REVALIDATE_MS)

interface NeoFeedResponse {
  near_earth_objects: Record<
    string,
    {
      id: string
      name: string
      nasa_jpl_url: string
      is_potentially_hazardous_asteroid: boolean
      is_sentry_object: boolean
      estimated_diameter: {
        meters: {
          estimated_diameter_min: number
          estimated_diameter_max: number
        }
      }
      close_approach_data: {
        close_approach_date: string
        close_approach_date_full: string
        epoch_date_close_approach: number
        relative_velocity: { kilometers_per_hour: string }
        miss_distance: { kilometers: string; lunar: string }
        orbiting_body: string
      }[]
    }[]
  >
}

const toDateString = (date: Date) => date.toISOString().slice(0, 10)

export interface AsteroidFeedResult {
  data: AsteroidFeed
  cacheAgeSeconds: number | null
}

export async function getAsteroidFeed(
  range: AsteroidRange
): Promise<AsteroidFeedResult> {
  const start = new Date()
  const end = new Date()
  end.setDate(end.getDate() + RANGE_DAYS[range])

  const rangeStart = toDateString(start)
  const rangeEnd = toDateString(end)
  const cacheKey = `${range}:${rangeStart}`
  const hit = feedCache.get(cacheKey)

  if (hit) return { data: hit.data, cacheAgeSeconds: hit.ageSeconds }

  const data = await apiClient<NeoFeedResponse>('/neo/rest/v1/feed', {
    params: { start_date: rangeStart, end_date: rangeEnd }
  })

  const asteroids: Asteroid[] = Object.values(data.near_earth_objects)
    .flat()
    .flatMap(neo =>
      neo.close_approach_data.map(approach => ({
        id: neo.id,
        key: `${neo.id}-${approach.epoch_date_close_approach}`,
        name: neo.name.replace(/^\((.*)\)$/, '$1'),
        isHazardous: neo.is_potentially_hazardous_asteroid,
        isSentry: neo.is_sentry_object,
        diameterMinM: neo.estimated_diameter.meters.estimated_diameter_min,
        diameterMaxM: neo.estimated_diameter.meters.estimated_diameter_max,
        approachDate: approach.close_approach_date,
        approachDateFull: approach.close_approach_date_full,
        approachTimestamp: approach.epoch_date_close_approach,
        velocityKph: Number(approach.relative_velocity.kilometers_per_hour),
        missDistanceKm: Number(approach.miss_distance.kilometers),
        missDistanceLunar: Number(approach.miss_distance.lunar),
        orbitingBody: approach.orbiting_body,
        jplUrl: neo.nasa_jpl_url
      }))
    )
    .sort((a, b) => a.missDistanceKm - b.missDistanceKm)

  const feed: AsteroidFeed = {
    asteroids,
    total: asteroids.length,
    hazardousCount: asteroids.filter(item => item.isHazardous).length,
    rangeStart,
    rangeEnd
  }

  feedCache.set(cacheKey, feed)

  return { data: feed, cacheAgeSeconds: null }
}
