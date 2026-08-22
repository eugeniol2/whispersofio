export type NasaMediaType = 'image' | 'video' | 'audio'

export type NasaMediaTypeFilter = 'all' | 'image' | 'video'

export interface NasaMediaItem {
  id: string
  title: string
  description: string | null
  dateCreated: string
  center: string | null
  keywords: string[]
  mediaType: NasaMediaType
  thumbnailUrl: string | null
  previewUrl: string | null
  detailUrl: string
}

export interface NasaMediaSearchResult {
  items: NasaMediaItem[]
  totalHits: number
}
