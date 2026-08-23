import { ApiError } from '../client'
import { MARS_RAW_IMAGES_BASE_URL } from '../endpoints'
import {
  getCameraView,
  roverCameras,
  roverFeedCategory
} from './roverReference'
import type {
  CameraView,
  MarsPhoto,
  RoverCamera,
  RoverName
} from './types'

export const PHOTO_LIMIT = 50

const FEED_TIMEOUT_MS = 45000
const FEED_CACHE_SECONDS = 6 * 60 * 60

export interface RawImagesFeed {
  sol: number
  num_images: number
  most_recent: string
  images: {
    imageid: string
    sol: number
    date_taken_utc: string
    link: string
    image_files: {
      medium?: string
      large?: string
      small?: string
      full_res?: string
    }
    camera: { instrument: string }
  }[]
}

interface FetchRawImagesFeedParams {
  rover: RoverName
  sol: number
  camera?: string
}

export async function fetchRawImagesFeed({
  rover,
  sol,
  camera
}: FetchRawImagesFeedParams): Promise<RawImagesFeed> {
  const url = new URL(MARS_RAW_IMAGES_BASE_URL)
  url.searchParams.set('feed', 'raw_images')
  url.searchParams.set('feedtype', 'json')
  url.searchParams.set('category', roverFeedCategory[rover])
  url.searchParams.set('sol', String(sol))
  if (camera) url.searchParams.set('search', camera)

  const response = await fetch(url, {
    signal: AbortSignal.timeout(FEED_TIMEOUT_MS),
    next: { revalidate: FEED_CACHE_SECONDS }
  })

  if (!response.ok) {
    throw new ApiError(response.status, 'Mars raw images request failed')
  }

  const data: RawImagesFeed = await response.json()

  return { ...data, images: data.images ?? [] }
}

interface MapFeedPhotosParams {
  rover: RoverName
  images: RawImagesFeed['images']
  camera?: string | null
  view?: CameraView | null
  limit?: number
}

export function listFeedCameras(
  rover: RoverName,
  images: RawImagesFeed['images']
): RoverCamera[] {
  const labels = new Map(
    roverCameras[rover].map(cam => [cam.name, cam.fullName])
  )
  const present = [...new Set(images.map(image => image.camera.instrument))]

  return present
    .map(name => ({ name, fullName: labels.get(name) ?? name }))
    .sort((a, b) => a.fullName.localeCompare(b.fullName))
}

export function mapFeedPhotos({
  rover,
  images,
  camera,
  view,
  limit = PHOTO_LIMIT
}: MapFeedPhotosParams): MarsPhoto[] {
  const cameraLabels = new Map(
    roverCameras[rover].map(cam => [cam.name, cam.fullName])
  )

  const matching = images.filter(image => {
    const instrument = image.camera.instrument
    if (camera && instrument !== camera) return false
    if (view && getCameraView(instrument) !== view) return false
    return true
  })

  return matching.slice(0, limit).map(image => {
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
      fullImageUrl: files.full_res ?? files.large ?? preview
    }
  })
}
