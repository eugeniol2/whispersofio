import { ApiError } from '../client'
import { MARS_RAW_IMAGES_BASE_URL } from '../endpoints'
import { roverFeedCategory } from './roverReference'
import type { RoverName } from './types'

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

// The feed ignores paging params once a sol is given and always returns that
// sol in full, so callers have to trim the result themselves.
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
