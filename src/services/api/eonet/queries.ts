'use client'

import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { fetchEonetCategories, fetchEonetEvents } from './requests'
import type { EonetStatusFilter } from './types'

export function useEonetCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.eonet.categories,
    queryFn: fetchEonetCategories
  })
}

interface UseEonetEventsQueryParams {
  status: EonetStatusFilter
  categoryId: string
}

export function useEonetEventsQuery({
  status,
  categoryId
}: UseEonetEventsQueryParams) {
  return useQuery({
    queryKey: queryKeys.eonet.events(status, categoryId),
    queryFn: () =>
      fetchEonetEvents({
        status,
        categoryId: categoryId === 'all' ? undefined : categoryId
      })
  })
}
