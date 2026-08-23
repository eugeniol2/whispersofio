import { ApiError } from '../client'
import { NASA_IMAGES_BASE_URL, NASA_IMAGES_SITE_URL } from '../endpoints'
import type {
  NasaMediaItem,
  NasaMediaSearchResult,
  NasaMediaType,
  NasaMediaTypeFilter
} from './types'

interface SearchResponse {
  collection: {
    items: {
      data: {
        nasa_id: string
        title?: string
        description?: string
        date_created?: string
        center?: string
        keywords?: string[]
        media_type: NasaMediaType
      }[]
      links?: { href: string; render?: string; width?: number }[]
    }[]
    metadata: { total_hits: number }
  }
}

type ImageLink = { href: string; render?: string; width?: number }

function pickImage(links: ImageLink[], variants: string[]): string | null {
  const images = links.filter(link => link.render === 'image')
  if (images.length === 0) return null

  for (const variant of variants) {
    const match = images.find(link => link.href.includes(`~${variant}.`))
    if (match) return match.href
  }

  const safe = images.filter(link => !link.href.includes('~orig.'))
  return (safe[0] ?? images[0]).href
}

interface AssetResponse {
  collection: { items: { href: string }[] }
}

const UPSTREAM_CACHE_SECONDS = 60 * 60

const VIDEO_VARIANTS = ['mobile', 'small', 'medium', 'large']

function toPlayableUrl(href: string): string {
  return new URL(href.replace(/^http:\/\//, 'https://')).toString()
}

export async function fetchNasaMediaVideo(
  nasaId: string,
  signal?: AbortSignal
): Promise<string | null> {
  const response = await fetch(
    `${NASA_IMAGES_BASE_URL}/asset/${encodeURIComponent(nasaId)}`,
    { signal }
  )

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to load the video asset')
  }

  const data: AssetResponse = await response.json()
  const files = (data.collection?.items ?? [])
    .map(item => item.href)
    .filter(href => href.endsWith('.mp4'))

  for (const variant of VIDEO_VARIANTS) {
    const match = files.find(href => href.includes(`~${variant}.mp4`))
    if (match) return toPlayableUrl(match)
  }

  const fallback = files.find(href => !href.includes('~orig.'))
  return fallback ? toPlayableUrl(fallback) : null
}

interface SearchNasaMediaParams {
  query: string
  mediaType: NasaMediaTypeFilter
  page: number
  pageSize: number
  signal?: AbortSignal
}

export async function searchNasaMedia({
  query,
  mediaType,
  page,
  pageSize,
  signal
}: SearchNasaMediaParams): Promise<NasaMediaSearchResult> {
  const url = new URL(`${NASA_IMAGES_BASE_URL}/search`)
  url.searchParams.set('q', query)
  url.searchParams.set('page', String(page))
  url.searchParams.set('page_size', String(pageSize))
  url.searchParams.set(
    'media_type',
    mediaType === 'all' ? 'image,video' : mediaType
  )

  const response = await fetch(url, {
    signal,
    next: { revalidate: UPSTREAM_CACHE_SECONDS }
  })

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to search the NASA library')
  }

  const data: SearchResponse = await response.json()
  const collection = data.collection

  const items: NasaMediaItem[] = (collection.items ?? [])
    .map(item => {
      const meta = item.data?.[0]
      if (!meta) return null

      const links = item.links ?? []

      return {
        id: meta.nasa_id,
        title: meta.title ?? 'Untitled',
        description: meta.description ?? null,
        dateCreated: meta.date_created ?? '',
        center: meta.center ?? null,
        keywords: meta.keywords ?? [],
        mediaType: meta.media_type,
        thumbnailUrl: pickImage(links, ['small', 'thumb', 'medium']),
        previewUrl: pickImage(links, ['medium', 'large', 'small']),
        detailUrl: `${NASA_IMAGES_SITE_URL}/details/${encodeURIComponent(meta.nasa_id)}`
      }
    })
    .filter((item): item is NasaMediaItem => item !== null)

  return { items, totalHits: collection.metadata?.total_hits ?? 0 }
}
