import type { EonetEvent } from '@/services/api/eonet/types'

const STORM_TYPE_PREFIX =
  /^(super typhoon|severe tropical storm|post-tropical cyclone|tropical depression|tropical cyclone|tropical storm|subtropical storm|typhoon|hurricane|cyclone)\s+/i

export function getZoomEarthStormSlug(event: EonetEvent): string | null {
  const isStorm = event.categories.some(c => c.id === 'severeStorms')
  if (!isStorm) return null

  const match = event.title.match(STORM_TYPE_PREFIX)
  if (!match) return null

  const name = event.title.slice(match[0].length).trim()
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  if (!slug) return null

  const firstGeometry = event.geometry[0]
  const year = new Date(firstGeometry.date).getFullYear()

  return `${slug}-${year}`
}
