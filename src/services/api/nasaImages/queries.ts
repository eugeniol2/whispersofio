'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { STALE_TIME_HOURLY } from '../staleTimes'
import { fetchNasaMediaVideo, searchNasaMedia } from './requests'
import type { NasaMediaTypeFilter } from './types'

export function useNasaMediaVideoQuery(nasaId: string | null) {
  return useQuery({
    queryKey: queryKeys.nasaImages.video(nasaId ?? ''),
    queryFn: ({ signal }) => {
      if (!nasaId) throw new Error('A NASA id is required')
      return fetchNasaMediaVideo(nasaId, signal)
    },
    enabled: Boolean(nasaId),
    staleTime: Infinity
  })
}

interface UseNasaMediaSearchQueryParams {
  query: string
  mediaType: NasaMediaTypeFilter
  page: number
  pageSize: number
}

export function useNasaMediaSearchQuery({
  query,
  mediaType,
  page,
  pageSize
}: UseNasaMediaSearchQueryParams) {
  return useQuery({
    queryKey: queryKeys.nasaImages.search(query, mediaType, page),
    staleTime: STALE_TIME_HOURLY,
    queryFn: ({ signal }) =>
      searchNasaMedia({ query, mediaType, page, pageSize, signal }),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData
  })
}
