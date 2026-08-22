import { ApiError } from '../client'
import type {
  AsteroidFeed,
  AsteroidRange,
  AsteroidVisibility
} from './types'

export async function fetchAsteroidVisibility(
  id: string,
  date: string,
  signal?: AbortSignal
): Promise<AsteroidVisibility> {
  const response = await fetch(
    `/api/asteroids/visibility?id=${id}&date=${date}`,
    { signal }
  )

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch visibility data')
  }

  return response.json()
}

export async function fetchAsteroidFeed(
  range: AsteroidRange,
  signal?: AbortSignal
): Promise<AsteroidFeed> {
  const response = await fetch(`/api/asteroids?range=${range}`, { signal })

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch asteroid data')
  }

  return response.json()
}
