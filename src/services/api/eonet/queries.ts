'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { STALE_TIME_HOURLY, STALE_TIME_QUARTER_HOURLY } from '../staleTimes'
import {
  fetchCategoryAvailability,
  fetchEonetCategories,
  fetchEonetEventById,
  fetchEonetEvents
} from './requests'
import type { EonetLimit, EonetStatusFilter, EonetTimeRange } from './types'

export function useEonetCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.eonet.categories,
    staleTime: STALE_TIME_HOURLY,
    queryFn: ({ signal }) => fetchEonetCategories(signal)
  })
}

export function useEonetEventQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.eonet.eventById(id),
    staleTime: STALE_TIME_QUARTER_HOURLY,
    queryFn: ({ signal }) => fetchEonetEventById(id, signal)
  })
}

interface UseEonetCategoryAvailabilityQueryParams {
  status: EonetStatusFilter
  timeRange: EonetTimeRange
}

export function useEonetCategoryAvailabilityQuery({
  status,
  timeRange
}: UseEonetCategoryAvailabilityQueryParams) {
  return useQuery({
    queryKey: queryKeys.eonet.categoryAvailability(status, timeRange),
    staleTime: STALE_TIME_QUARTER_HOURLY,
    queryFn: ({ signal }) =>
      fetchCategoryAvailability({ status, timeRange, signal }),
    placeholderData: keepPreviousData
  })
}

interface UseEonetEventsQueryParams {
  status: EonetStatusFilter
  categoryId: string
  limit: EonetLimit
  timeRange: EonetTimeRange
}

export function useEonetEventsQuery({
  status,
  categoryId,
  limit,
  timeRange
}: UseEonetEventsQueryParams) {
  return useQuery({
    queryKey: queryKeys.eonet.events(status, categoryId, limit, timeRange),
    staleTime: STALE_TIME_QUARTER_HOURLY,
    queryFn: ({ signal }) =>
      fetchEonetEvents({
        status,
        categoryId: categoryId === 'all' ? undefined : categoryId,
        limit,
        timeRange,
        signal
      }),
    placeholderData: keepPreviousData
  })
}
