import { createKeyedServerCache } from '../serverCache'
import { fetchRawImagesFeed, listFeedCameras, mapFeedPhotos } from './feed'
import { roverMissionFacts } from './roverReference'
import type { RoverInfoPayload, RoverName } from './types'

const REVALIDATE_MS = 6 * 60 * 60 * 1000
const MARS_SOL_IN_EARTH_DAYS = 1.0274912
const SOL_PROBE_WINDOW = 12
const SOL_PROBE_BUDGET_MS = 90000

const infoCache = createKeyedServerCache<RoverInfoPayload>(REVALIDATE_MS)

function getEstimatedSol(landingDate: string): number {
  const elapsedDays =
    (Date.now() - new Date(landingDate).getTime()) / (1000 * 60 * 60 * 24)
  return Math.floor(elapsedDays / MARS_SOL_IN_EARTH_DAYS)
}

export interface RoverInfoResult {
  data: RoverInfoPayload
  cacheAgeSeconds: number | null
}

export async function getRoverInfo(
  rover: RoverName
): Promise<RoverInfoResult | null> {
  const hit = infoCache.get(rover)
  if (hit) return { data: hit.data, cacheAgeSeconds: hit.ageSeconds }

  const facts = roverMissionFacts[rover]
  const estimatedSol = getEstimatedSol(facts.landingDate)

  let latest = null
  const deadline = Date.now() + SOL_PROBE_BUDGET_MS

  for (let offset = 0; offset < SOL_PROBE_WINDOW; offset += 1) {
    const sol = estimatedSol - offset
    if (sol < 0 || Date.now() > deadline) break

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

  if (!latest) return null

  const data: RoverInfoPayload = {
    ...facts,
    latestSol: latest.sol,
    latestDate: latest.most_recent,
    totalImages: latest.num_images,
    photos: mapFeedPhotos({ rover, images: latest.images }),
    cameras: listFeedCameras(rover, latest.images)
  }

  infoCache.set(rover, data)

  return { data, cacheAgeSeconds: null }
}
