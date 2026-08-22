'use client'

import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import {
  fetchApod,
  fetchApodStats,
  fetchRandomApod,
  fetchRecentApods
} from './requests'

interface UseApodQueryParams {
  mode: 'date' | 'random'
  date: string
  randomToken: number
}

export function useApodQuery({ mode, date, randomToken }: UseApodQueryParams) {
  return useQuery({
    queryKey:
      mode === 'random'
        ? queryKeys.apod.random(randomToken)
        : queryKeys.apod.byDate(date),
    queryFn: () => (mode === 'random' ? fetchRandomApod() : fetchApod(date))
  })
}

export function useRecentApodsQuery() {
  return useQuery({
    queryKey: queryKeys.apod.recent,
    queryFn: fetchRecentApods
  })
}

export function useApodStatsQuery() {
  return useQuery({
    queryKey: queryKeys.apod.stats,
    queryFn: fetchApodStats
  })
}
