import { apiClient } from '../client'
import { createKeyedServerCache } from '../serverCache'

const REVALIDATE_MS = 60 * 60 * 4 * 1000

const UPSTREAM_CACHE_SECONDS = 60 * 60 * 4
const apodCache = createKeyedServerCache<unknown>(REVALIDATE_MS, 60)

const HEAD_TIMEOUT_MS = 6000

const getYesterdayDateString = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().slice(0, 10)
}

interface ApodItem {
  media_type?: string
  url?: string
  thumbnail_url?: string
  video_size_bytes?: number | null
}

async function attachVideoSizes(payload: unknown): Promise<unknown> {
  const items = (Array.isArray(payload) ? payload : [payload]) as ApodItem[]

  const targets = items.filter(
    item =>
      item?.media_type === 'video' &&
      typeof item.url === 'string' &&
      item.url.endsWith('.mp4')
  )

  if (targets.length === 0) return payload

  await Promise.allSettled(
    targets.map(async item => {
      try {
        const response = await fetch(item.url as string, {
          method: 'HEAD',
          signal: AbortSignal.timeout(HEAD_TIMEOUT_MS)
        })
        const length = response.headers.get('content-length')
        item.video_size_bytes = length ? Number(length) : null
      } catch {
        item.video_size_bytes = null
      }
    })
  )

  return payload
}

export interface ApodQuery {
  date?: string | null
  start?: string | null
  end?: string | null
  random?: boolean
}

export interface ApodResult {
  data: unknown
  cacheAgeSeconds: number | null
}

export async function getApod({
  date,
  start,
  end,
  random
}: ApodQuery): Promise<ApodResult> {
  const params: Record<string, string> = {}
  let cacheKey: string | null = null

  if (random) {
    params.count = '1'
  } else if (start && end) {
    params.start_date = start
    params.end_date = end
    params.thumbs = 'true'
    cacheKey = `range:${start}:${end}`
  } else {
    params.date = date ?? getYesterdayDateString()
    params.thumbs = 'true'
    cacheKey = `date:${params.date}`
  }

  if (cacheKey) {
    const hit = apodCache.get(cacheKey)
    if (hit) return { data: hit.data, cacheAgeSeconds: hit.ageSeconds }
  }

  const apod = await attachVideoSizes(
    await apiClient(
      '/planetary/apod',
      cacheKey
        ? { params, revalidate: UPSTREAM_CACHE_SECONDS }
        : { params, cache: 'no-store' }
    )
  )

  if (cacheKey) apodCache.set(cacheKey, apod)

  return { data: apod, cacheAgeSeconds: null }
}
