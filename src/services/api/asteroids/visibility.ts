import type { VisibilityTier } from './types'

interface VisibilityTierInfo {
  tier: VisibilityTier
  equipment: string
  detail: string
}

// Limiting magnitudes for a dark, moonless sky. Higher magnitude = fainter.
const TIERS: { maxMagnitude: number; info: VisibilityTierInfo }[] = [
  {
    maxMagnitude: 6,
    info: {
      tier: 'naked-eye',
      equipment: 'Naked eye',
      detail: 'Bright enough to spot without any equipment under dark skies.'
    }
  },
  {
    maxMagnitude: 9.5,
    info: {
      tier: 'binoculars',
      equipment: 'Binoculars',
      detail: 'Within reach of 10x50 binoculars away from city lights.'
    }
  },
  {
    maxMagnitude: 12.5,
    info: {
      tier: 'small-telescope',
      equipment: 'Small telescope',
      detail: 'Needs roughly a 4–6 inch telescope.'
    }
  },
  {
    maxMagnitude: 14.5,
    info: {
      tier: 'medium-telescope',
      equipment: 'Medium telescope',
      detail: 'Needs roughly an 8–10 inch telescope under dark skies.'
    }
  },
  {
    maxMagnitude: 16.5,
    info: {
      tier: 'large-telescope',
      equipment: 'Large amateur telescope',
      detail: 'Needs a 12–16 inch telescope, ideally with a camera.'
    }
  }
]

const BEYOND_AMATEUR: VisibilityTierInfo = {
  tier: 'not-visible',
  equipment: 'Professional equipment',
  detail:
    'Too faint for amateur gear — this one is only within reach of large observatory telescopes.'
}

export function getVisibilityTier(magnitude: number): VisibilityTierInfo {
  const match = TIERS.find(entry => magnitude <= entry.maxMagnitude)
  return match ? match.info : BEYOND_AMATEUR
}

// An object culminates overhead at a latitude equal to its declination, and
// never rises for observers more than 90 degrees away from it.
export function describeVisibleRegions(declination: number): {
  summary: string
  regions: string
  limit: string
} {
  const southernLimit = declination - 90
  const northernLimit = declination + 90

  const limit =
    southernLimit > -90
      ? `Never rises south of ${Math.abs(Math.round(southernLimit))}°S.`
      : northernLimit < 90
        ? `Never rises north of ${Math.round(northernLimit)}°N.`
        : 'Rises at some point from every inhabited latitude.'

  if (declination > 50) {
    return {
      summary: 'Far northern skies',
      regions: 'Best from Canada, northern Europe, Russia and Alaska.',
      limit
    }
  }

  if (declination > 20) {
    return {
      summary: 'Northern hemisphere',
      regions:
        'Best from the United States, Europe, Japan, China and North Africa.',
      limit
    }
  }

  if (declination > -20) {
    return {
      summary: 'Visible worldwide',
      regions:
        'Passes overhead near the equator — Brazil, central Africa, India and Indonesia get the best view.',
      limit
    }
  }

  if (declination > -50) {
    return {
      summary: 'Southern hemisphere',
      regions:
        'Best from Australia, South Africa, Argentina, Chile and southern Brazil.',
      limit
    }
  }

  return {
    summary: 'Far southern skies',
    regions:
      'Best from southern Chile and Argentina, New Zealand and Antarctica.',
    limit
  }
}

export function formatDeclination(declination: number): string {
  const hemisphere = declination >= 0 ? 'N' : 'S'
  return `${Math.abs(declination).toFixed(1)}°${hemisphere}`
}
