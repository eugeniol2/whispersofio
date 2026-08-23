import { NextResponse } from 'next/server'

import { ApiError } from '@/services/api/client'
import {
  fetchRawImagesFeed,
  listFeedCameras,
  mapFeedPhotos
} from '@/services/api/marsRover/feed'
import type {
  CameraView,
  RoverName,
  RoverPhotosPayload
} from '@/services/api/marsRover/types'
import { createKeyedServerCache } from '@/services/api/serverCache'

const REVALIDATE_MS = 60 * 60 * 1000

const VALID_ROVERS: RoverName[] = ['curiosity', 'perseverance']
const VALID_VIEWS: CameraView[] = ['left', 'right', 'sky', 'other']

const photosCache = createKeyedServerCache<RoverPhotosPayload>(REVALIDATE_MS)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rover = searchParams.get('rover') as RoverName | null
  const solParam = searchParams.get('sol')
  const camera = searchParams.get('camera') ?? undefined
  const viewParam = searchParams.get('view')
  const sol = Number(solParam)

  if (
    !rover ||
    !VALID_ROVERS.includes(rover) ||
    solParam === null ||
    !Number.isFinite(sol) ||
    sol < 0 ||
    (viewParam !== null && !VALID_VIEWS.includes(viewParam as CameraView))
  ) {
    return NextResponse.json({ error: 'Invalid params' }, { status: 400 })
  }

  const view = viewParam as CameraView | null
  const cacheKey = `${rover}:${sol}:${camera ?? 'all'}:${view ?? 'all'}`
  const hit = photosCache.get(cacheKey)

  if (hit) {
    return NextResponse.json(hit.data, {
      headers: {
        'X-Cache': 'HIT',
        'X-Cache-Age-Seconds': String(hit.ageSeconds)
      }
    })
  }

  try {
    // Fetched unfiltered on purpose: the feed costs the same regardless of
    // payload, and the full sol is what tells us which cameras actually have
    // images for this sol.
    const feed = await fetchRawImagesFeed({ rover, sol })
    const payload: RoverPhotosPayload = {
      photos: mapFeedPhotos({ rover, images: feed.images, camera, view }),
      cameras: listFeedCameras(rover, feed.images)
    }

    photosCache.set(cacheKey, payload)

    return NextResponse.json(payload, { headers: { 'X-Cache': 'MISS' } })
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502
    return NextResponse.json(
      { error: 'Failed to fetch rover photos' },
      { status }
    )
  }
}
