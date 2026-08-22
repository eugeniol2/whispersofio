export type ApodMediaType = 'image' | 'video' | 'other'

export interface ApodEntry {
  id: string
  date: string
  title: string
  description: string
  credit: string | null
  mediaType: ApodMediaType
  url: string
  hdUrl: string | null
  thumbnailUrl: string | null
  isYouTube: boolean
  videoSizeBytes: number | null
}

export interface ApodStat {
  value: string
  label: string
}
