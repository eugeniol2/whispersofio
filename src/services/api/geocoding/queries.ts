'use client'

import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { fetchReverseGeocode } from './requests'

export function useReverseGeocodeQuery(
  lat: number,
  lon: number,
  enabled = true
) {
  const roundedLat = Math.round(lat * 100) / 100
  const roundedLon = Math.round(lon * 100) / 100

  return useQuery({
    queryKey: queryKeys.geocoding.reverse(roundedLat, roundedLon),
    queryFn: ({ signal }) =>
      fetchReverseGeocode(roundedLat, roundedLon, signal),
    staleTime: Infinity,
    enabled
  })
}
