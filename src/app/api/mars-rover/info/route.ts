import { NextResponse } from 'next/server'

import { fetchRawImagesFeed } from '@/services/api/marsRover/feed'
import {
  roverCameras,
  roverMissionFacts
} from '@/services/api/marsRover/roverReference'
import type { RoverInfo, RoverName } from '@/services/api/marsRover/types'
import { createKeyedServerCache } from '@/services/api/serverCache'

const REVALIDATE_MS = 6 * 60 * 60 * 1000
const MARS_SOL_IN_EARTH_DAYS = 1.0274912
const SOL_PROBE_WINDOW = 12

const VALID_ROVERS: RoverName[] = ['curiosity', 'perseverance']

const infoCache = createKeyedServerCache<RoverInfo>(REVALIDATE_MS)

function getEstimatedSol(landingDate: string): number {
  const elapsedDays =
    (Date.now() - new Date(landingDate).getTime()) / (1000 * 60 * 60 * 24)
  return Math.floor(elapsedDays / MARS_SOL_IN_EARTH_DAYS)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rover = searchParams.get('rover') as RoverName | null

  if (!rover || !VALID_ROVERS.includes(rover)) {
    return NextResponse.json({ error: 'Invalid rover' }, { status: 400 })
  }

  const hit = infoCache.get(rover)

  if (hit) {
    return NextResponse.json(hit.data, {
      headers: {
        'X-Cache': 'HIT',
        'X-Cache-Age-Seconds': String(hit.ageSeconds)
      }
    })
  }

  const facts = roverMissionFacts[rover]
  const estimatedSol = getEstimatedSol(facts.landingDate)

  // The feed has no "latest sol" endpoint and imagery lags the current sol by a
  // few days, so walk back until a sol has images. The probes run sequentially
  // because the feed throttles hard under concurrent requests.
  let latest = null

  for (let offset = 0; offset < SOL_PROBE_WINDOW; offset += 1) {
    const sol = estimatedSol - offset
    if (sol < 0) break

    try {
      const feed = await fetchRawImagesFeed({ rover, sol })
      if (feed.num_images > 0) {
        latest = feed
        break
      }
    } catch {
      continue
    }
  }

  if (!latest) {
    return NextResponse.json(
      { error: 'No recent imagery found for this rover' },
      { status: 502 }
    )
  }

  const info: RoverInfo = {
    ...facts,
    latestSol: latest.sol,
    latestDate: latest.most_recent,
    totalImages: latest.num_images,
    cameras: roverCameras[rover]
  }

  infoCache.set(rover, info)

  return NextResponse.json(info, { headers: { 'X-Cache': 'MISS' } })
}
