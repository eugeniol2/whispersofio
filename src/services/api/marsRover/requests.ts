import { ApiError } from '../client'
import type {
  CameraView,
  RoverInfoPayload,
  RoverName,
  RoverPhotosPayload
} from './types'

export async function fetchRoverInfo(
  rover: RoverName,
  signal?: AbortSignal
): Promise<RoverInfoPayload> {
  const response = await fetch(`/api/mars-rover/info?rover=${rover}`, { signal })

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch rover info')
  }

  return response.json()
}

interface FetchRoverPhotosParams {
  rover: RoverName
  sol: number
  camera?: string
  view?: CameraView
  signal?: AbortSignal
}

export async function fetchRoverPhotos({
  rover,
  sol,
  camera,
  view,
  signal
}: FetchRoverPhotosParams): Promise<RoverPhotosPayload> {
  const url = new URL('/api/mars-rover/photos', window.location.origin)
  url.searchParams.set('rover', rover)
  url.searchParams.set('sol', String(sol))
  if (camera) url.searchParams.set('camera', camera)
  if (view) url.searchParams.set('view', view)

  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch rover photos')
  }

  return response.json()
}
