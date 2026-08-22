import type { ReverseGeocodeResult } from '@/services/api/geocoding/types'

export function formatGeocodeResult(
  result: ReverseGeocodeResult
): string | null {
  const parts = [result.city, result.principalSubdivision].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : result.countryName
}
