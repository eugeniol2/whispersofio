export type DashboardIconKey =
  | 'apod'
  | 'earthEvents'
  | 'marsRover'
  | 'media'
  | 'asteroids'
  | 'more'

export interface DashboardStat {
  id: string
  icon: DashboardIconKey
  value: string
  label: string
}

export interface DashboardFeaturedContent {
  badge: string
  date: string
  title: string
  description: string
  imageLabel: string
  mediaType?: 'image' | 'video'
  mediaUrl?: string
  credit: string | null
  href: string
}

export interface DashboardApiCollection {
  id: string
  icon: DashboardIconKey
  title: string
  description: string
  caption: string
  href: string | null
}

export interface DashboardActivityItem {
  id: string
  icon: DashboardIconKey
  title: string
  timestamp: string
}
