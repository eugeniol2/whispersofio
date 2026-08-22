'use client'

import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { fetchReverseGeocode } from './requests'

export function useReverseGeocodeQuery(
  lat: number,
  lon: number,
  enabled = true
) {
  // Round to ~1km precision — city/state resolution doesn't need more,
  // and it lets nearby events (e.g. several wildfire reports in one
  // area) share a single cached lookup instead of firing separate calls.
  const roundedLat = Math.round(lat * 100) / 100
  const roundedLon = Math.round(lon * 100) / 100

  return useQuery({
    queryKey: queryKeys.geocoding.reverse(roundedLat, roundedLon),
    queryFn: () => fetchReverseGeocode(roundedLat, roundedLon),
    staleTime: Infinity, // a coordinate's city/state never changes
    enabled
  })
}
