'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import {
  fetchAvailableCategoryIds,
  fetchEonetCategories,
  fetchEonetEventById,
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

export function useEonetEventQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.eonet.eventById(id),
    queryFn: ({ signal }) => fetchEonetEventById(id, signal)
  })
}

interface UseEonetCategoryAvailabilityQueryParams {
  status: EonetStatusFilter
  timeRange: EonetTimeRange
  categoryIds: EonetCategoryId[]
}

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
    placeholderData: keepPreviousData
  })
}
