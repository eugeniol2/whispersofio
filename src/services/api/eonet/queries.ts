'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { fetchEonetCategories, fetchEonetEvents } from './requests'
import type {
  EonetLimit,
  EonetStatusFilter,
  EonetTimeRange
} from './types'

export function useEonetCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.eonet.categories,
    queryFn: fetchEonetCategories
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
    queryFn: () =>
      fetchEonetEvents({
        status,
        categoryId: categoryId === 'all' ? undefined : categoryId,
        limit,
        timeRange
      }),
    // Filters apply immediately (no Search button) — keep the current
    // results on screen while the new combination loads instead of
    // flashing a blank spinner on every change.
    placeholderData: keepPreviousData
  })
}
