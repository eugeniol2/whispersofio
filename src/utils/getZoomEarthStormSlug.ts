import type { EonetEvent } from '@/services/api/eonet/types'

// zoom.earth only has dedicated per-event pages (e.g. zoom.earth/storms/
// saudel-2026/) for named tropical cyclone systems — EONET's severeStorms
// category. Wildfires, earthquakes, volcanoes etc. only appear there as
// generic map overlays with no individual permalinks, so this can never
// apply outside of storms.
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
