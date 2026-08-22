export type AsteroidRange = 'today' | '3days' | '7days'

export type AsteroidHazardFilter = 'all' | 'hazardous'

export type AsteroidSort = 'closest' | 'largest' | 'fastest'

export interface Asteroid {
  id: string
  key: string
  name: string
  isHazardous: boolean
  isSentry: boolean
  diameterMinM: number
  diameterMaxM: number
  approachDate: string
  approachDateFull: string
  approachTimestamp: number
  velocityKph: number
  missDistanceKm: number
  missDistanceLunar: number
  orbitingBody: string
  jplUrl: string
}

export type VisibilityTier =
  | 'naked-eye'
  | 'binoculars'
  | 'small-telescope'
  | 'medium-telescope'
  | 'large-telescope'
  | 'not-visible'

export interface AsteroidVisibility {
  magnitude: number | null
  declination: number | null
  rightAscension: string | null
  observedAt: string | null
}

export interface AsteroidFeed {
  asteroids: Asteroid[]
  total: number
  hazardousCount: number
  rangeStart: string
  rangeEnd: string
}
