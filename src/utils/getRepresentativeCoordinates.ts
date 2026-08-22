import type { EonetGeometry } from '@/services/api/eonet/types'

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
