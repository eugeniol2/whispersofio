import { ApiError } from '../client'

interface ZoomEarthLinkResponse {
  valid: boolean
}

export async function fetchZoomEarthLinkValid(
  slug: string,
  signal?: AbortSignal
): Promise<boolean> {
  const response = await fetch(
    `/api/zoom-earth-link?slug=${encodeURIComponent(slug)}`,
    { signal }
  )

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to verify zoom.earth link')
  }

  const data: ZoomEarthLinkResponse = await response.json()
  return data.valid
}
