import { ApiError } from '../client'
import type { ApodEntry, ApodMediaType, ApodStat } from './types'

const APOD_ARCHIVE_START = '1995-06-16'
const RECENT_DAYS = 6

interface ApodApiResponse {
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

function toEntry(item: ApodApiResponse): ApodEntry {
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
  return toEntry(item)
}

export async function fetchRandomApod(): Promise<ApodEntry> {
  const [item] = await requestApod('?random=1')
  return toEntry(item)
}

const toDateString = (date: Date) => date.toISOString().slice(0, 10)

export async function fetchRecentApods(): Promise<ApodEntry[]> {
  const end = new Date()
  end.setDate(end.getDate() - 1)
  const start = new Date(end)
  start.setDate(start.getDate() - RECENT_DAYS)

  const items = await requestApod(
    `?start=${toDateString(start)}&end=${toDateString(end)}`
  )

  return items.map(toEntry).reverse()
}

export async function fetchApodStats(): Promise<ApodStat[]> {
  const entries = await fetchRecentApods()

  const startDate = new Date(APOD_ARCHIVE_START)
  const daysPublished = Math.floor(
    (Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  const years = Math.floor(daysPublished / 365.25)

  return [
    {
      value: daysPublished.toLocaleString('en-US'),
      label: 'Days Published'
    },
    { value: `${years}`, label: 'Years Running' },
    {
      value: `${entries.filter(entry => entry.mediaType === 'image').length}`,
      label: 'Images This Week'
    },
    {
      value: `${entries.filter(entry => entry.mediaType === 'video').length}`,
      label: 'Videos This Week'
    }
  ]
}
