'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import {
  fetchAvailableCategoryIds,
  fetchEonetCategories,
  fetchEonetEvents
} from './requests'
import type {
  EonetCategoryId,
  EonetLimit,
  EonetStatusFilter,
  EonetTimeRange
} from './types'

export function useEonetCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.eonet.categories,
    queryFn: ({ signal }) => fetchEonetCategories(signal)
  })
}

interface UseEonetCategoryAvailabilityQueryParams {
  status: EonetStatusFilter
  timeRange: EonetTimeRange
  categoryIds: EonetCategoryId[]
}

// Which categories actually have at least one event under the current
// status/time range — used to hide empty options from the Category select.
export function useEonetCategoryAvailabilityQuery({
  status,
  timeRange,
  categoryIds
}: UseEonetCategoryAvailabilityQueryParams) {
  return useQuery({
    queryKey: queryKeys.eonet.categoryAvailability(status, timeRange),
    queryFn: ({ signal }) =>
      fetchAvailableCategoryIds({ status, timeRange, categoryIds, signal }),
    enabled: categoryIds.length > 0,
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
    queryFn: ({ signal }) =>
      fetchEonetEvents({
        status,
        categoryId: categoryId === 'all' ? undefined : categoryId,
        limit,
        timeRange,
        signal
      }),
    // Filters apply immediately (no Search button) — keep the current
    // results on screen while the new combination loads instead of
    // flashing a blank spinner on every change.
    placeholderData: keepPreviousData
  })
}
