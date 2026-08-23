import { ApiError } from '../client'
import { MARS_RAW_IMAGES_BASE_URL } from '../endpoints'
import {
  getCameraView,
  roverCameras,
  roverFeedCategory
} from './roverReference'
import type { CameraView, MarsPhoto, RoverName } from './types'

export const PHOTO_LIMIT = 50

const FEED_TIMEOUT_MS = 20000

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
    signal: AbortSignal.timeout(FEED_TIMEOUT_MS)
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
  view?: CameraView | null
  limit?: number
}

export function mapFeedPhotos({
  rover,
  images,
  view,
  limit = PHOTO_LIMIT
}: MapFeedPhotosParams): MarsPhoto[] {
  const cameraLabels = new Map(
    roverCameras[rover].map(cam => [cam.name, cam.fullName])
  )

  const matching = view
    ? images.filter(image => getCameraView(image.camera.instrument) === view)
    : images

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
