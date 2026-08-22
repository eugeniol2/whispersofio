import type { EonetGeometry } from '@/services/api/eonet/types'

// Point coordinates are a flat [lon, lat] pair. Polygon coordinates are
// GeoJSON-style rings of [lon, lat] pairs — use the first vertex as a
// representative point for display.
export function getRepresentativeCoordinates(
  geometry: EonetGeometry
): [number, number] {
  if (geometry.type === 'Point') {
    const [lon, lat] = geometry.coordinates as number[]
    return [lon, lat]
  }

  const [lon, lat] = (geometry.coordinates as number[][][])[0][0]
  return [lon, lat]
}
