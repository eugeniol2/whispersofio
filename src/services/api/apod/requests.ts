import { ApiError } from '../client'
import type { ApodEntry, ApodMediaType, ApodStat } from './types'

const APOD_ARCHIVE_START = '1995-06-16'
const RECENT_DAYS = 6
const STATS_DAYS = 29

export interface ApodApiResponse {
  date: string
  title: string
  explanation: string
  media_type: string
  url: string
  hdurl?: string
  thumbnail_url?: string
  copyright?: string
  video_size_bytes?: number | null
}

const toMediaType = (value: string): ApodMediaType =>
  value === 'image' || value === 'video' ? value : 'other'

export function toApodEntry(item: ApodApiResponse): ApodEntry {
  const isYouTube = /youtube\.com|youtu\.be|vimeo\.com/.test(item.url)

  return {
    id: item.date,
    date: item.date,
    title: item.title,
    description: item.explanation,
    credit: item.copyright?.trim() ?? null,
    mediaType: toMediaType(item.media_type),
    url: item.url,
    hdUrl: item.hdurl ?? null,
    thumbnailUrl:
      item.thumbnail_url ?? (item.media_type === 'image' ? item.url : null),
    isYouTube,
    videoSizeBytes: item.video_size_bytes ?? null
  }
}

async function requestApod(query: string): Promise<ApodApiResponse[]> {
  const response = await fetch(`/api/apod${query}`)

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch APOD')
  }

  const data: ApodApiResponse | ApodApiResponse[] = await response.json()
  return Array.isArray(data) ? data : [data]
}

export async function fetchApod(date: string): Promise<ApodEntry> {
  const [item] = await requestApod(`?date=${date}`)
  return toApodEntry(item)
}

export async function fetchRandomApod(): Promise<ApodEntry> {
  const [item] = await requestApod('?random=1')
  return toApodEntry(item)
}

const toDateString = (date: Date) => date.toISOString().slice(0, 10)

export function getApodRangeDates(days: number): {
  start: string
  end: string
} {
  const end = new Date()
  end.setDate(end.getDate() - 1)
  const start = new Date(end)
  start.setDate(start.getDate() - days)

  return { start: toDateString(start), end: toDateString(end) }
}

export const APOD_RECENT_DAYS = RECENT_DAYS
export const APOD_STATS_DAYS = STATS_DAYS

async function fetchApodRange(days: number): Promise<ApodEntry[]> {
  const { start, end } = getApodRangeDates(days)
  const items = await requestApod(`?start=${start}&end=${end}`)

  return items.map(toApodEntry).reverse()
}

export function fetchRecentApods(): Promise<ApodEntry[]> {
  return fetchApodRange(RECENT_DAYS)
}

export function buildApodStats(entries: ApodEntry[]): ApodStat[] {
  const daysSinceLaunch = Math.floor(
    (Date.now() - new Date(APOD_ARCHIVE_START).getTime()) /
      (1000 * 60 * 60 * 24)
  )
  const years = Math.floor(daysSinceLaunch / 365.25)

  return [
    { value: `${years}`, label: 'Years Running' },
    {
      value: daysSinceLaunch.toLocaleString('en-US'),
      label: 'Days Since Launch'
    },
    {
      value: `${entries.filter(entry => entry.mediaType === 'image').length}`,
      label: 'Images This Month'
    },
    {
      value: `${entries.filter(entry => entry.mediaType === 'video').length}`,
      label: 'Videos This Month'
    }
  ]
}

export async function fetchApodStats(): Promise<ApodStat[]> {
  return buildApodStats(await fetchApodRange(STATS_DAYS))
}
