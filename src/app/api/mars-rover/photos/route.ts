import { NextResponse } from 'next/server'

import { ApiError } from '@/services/api/client'
import { fetchRawImagesFeed } from '@/services/api/marsRover/feed'
import {
  getCameraView,
  roverCameras
} from '@/services/api/marsRover/roverReference'
import type {
  CameraView,
  MarsPhoto,
  RoverName
} from '@/services/api/marsRover/types'
import { createKeyedServerCache } from '@/services/api/serverCache'

const REVALIDATE_MS = 60 * 60 * 1000
const PHOTO_LIMIT = 50

const VALID_ROVERS: RoverName[] = ['curiosity', 'perseverance']
const VALID_VIEWS: CameraView[] = ['left', 'right', 'sky', 'other']

const photosCache = createKeyedServerCache<MarsPhoto[]>(REVALIDATE_MS)

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
    const feed = await fetchRawImagesFeed({ rover, sol, camera })

    const cameraLabels = new Map(
      roverCameras[rover].map(cam => [cam.name, cam.fullName])
    )

    const matching = view
      ? feed.images.filter(
          image => getCameraView(image.camera.instrument) === view
        )
      : feed.images

    const photos: MarsPhoto[] = matching.slice(0, PHOTO_LIMIT).map(image => {
      const instrument = image.camera.instrument
      const files = image.image_files
      const preview = files.medium ?? files.large ?? files.small ?? ''

      return {
        id: image.imageid,
        sol: image.sol,
        earthDate: image.date_taken_utc.slice(0, 10),
        camera: {
          name: instrument,
          fullName: cameraLabels.get(instrument) ?? instrument
        },
        imageUrl: preview,
        // The feed's own `link` 403s for Curiosity, so point at the image itself
        fullImageUrl: files.full_res ?? files.large ?? preview
      }
    })

    photosCache.set(cacheKey, photos)

    return NextResponse.json(photos, { headers: { 'X-Cache': 'MISS' } })
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502
    return NextResponse.json(
      { error: 'Failed to fetch rover photos' },
      { status }
    )
  }
}
