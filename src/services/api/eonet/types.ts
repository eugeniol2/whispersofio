export type EonetCategoryId =
  | 'wildfires'
  | 'severeStorms'
  | 'volcanoes'
  | 'seaLakeIce'
  | 'earthquakes'
  | 'drought'
  | 'dustHaze'
  | 'floods'
  | 'landslides'
  | 'manmade'
  | 'snow'
  | 'tempExtremes'
  | 'waterColor'

export interface EonetCategory {
  id: EonetCategoryId
  title: string
}

export interface EonetSource {
  id: string
  url: string
}

export interface EonetGeometry {
  date: string
  type: 'Point' | 'Polygon'
  // Point: [lon, lat]. Polygon: rings of [lon, lat] pairs, GeoJSON-style.
  coordinates: number[] | number[][][]
  magnitudeValue?: number | null
  magnitudeUnit?: string | null
}

export interface EonetEvent {
  id: string
  title: string
  description: string | null
  link: string
  closed: string | null
  categories: EonetCategory[]
  sources: EonetSource[]
  geometry: EonetGeometry[]
}

export type EonetStatusFilter = 'open' | 'closed' | 'all'

export type EonetLimit = 30 | 100 | 200 | 'unlimited'

export type EonetTimeRange = 'today' | 'week' | 'month' | 'all'
