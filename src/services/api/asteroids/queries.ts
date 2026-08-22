'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { fetchAsteroidFeed, fetchAsteroidVisibility } from './requests'
import type { AsteroidRange } from './types'

export function useAsteroidVisibilityQuery(
  id: string | null,
  date: string | null
) {
  return useQuery({
    queryKey: queryKeys.asteroids.visibility(id ?? '', date ?? ''),
    queryFn: ({ signal }) => {
      if (!id || !date) throw new Error('An asteroid id and date are required')
      return fetchAsteroidVisibility(id, date, signal)
    },
    enabled: Boolean(id && date),
    staleTime: Infinity
  })
}

export function useAsteroidFeedQuery(range: AsteroidRange) {
  return useQuery({
    queryKey: queryKeys.asteroids.feed(range),
    queryFn: ({ signal }) => fetchAsteroidFeed(range, signal),
    placeholderData: keepPreviousData
  })
}
