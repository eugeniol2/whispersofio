import { ApiError } from '../client'
import { BIGDATACLOUD_BASE_URL } from '../endpoints'
import type { ReverseGeocodeResult } from './types'

// BigDataCloud's reverse-geocode-client endpoint is free, keyless, and
// CORS-open — no secret to protect, so this calls straight from the
// browser like EONET does.
interface BigDataCloudResponse {
  city: string
  locality: string
  principalSubdivision: string
  countryName: string
}

export async function fetchReverseGeocode(
  lat: number,
  lon: number,
  signal?: AbortSignal
): Promise<ReverseGeocodeResult> {
  const url = new URL(`${BIGDATACLOUD_BASE_URL}/reverse-geocode-client`)
  url.searchParams.set('latitude', String(lat))
  url.searchParams.set('longitude', String(lon))
  url.searchParams.set('localityLanguage', 'en')

  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to reverse geocode')
  }

  const data: BigDataCloudResponse = await response.json()

  return {
    city: data.city || data.locality || null,
    principalSubdivision: data.principalSubdivision || null,
    countryName: data.countryName || null
  }
}
