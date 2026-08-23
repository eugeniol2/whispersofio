'use client'

import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { STALE_TIME_QUARTER_HOURLY } from '../staleTimes'
import {
  fetchDashboardActivity,
  fetchDashboardApiCollections,
  fetchDashboardFeaturedContent,
  fetchDashboardStats
} from './requests'

export function useDashboardStatsQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats,
    staleTime: STALE_TIME_QUARTER_HOURLY,
    queryFn: fetchDashboardStats
  })
}

export function useDashboardFeaturedContentQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard.featuredContent,
    staleTime: STALE_TIME_QUARTER_HOURLY,
    queryFn: fetchDashboardFeaturedContent
  })
}

export function useDashboardApiCollectionsQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard.apiCollections,
    // Static local data; there is nothing upstream to go out of date.
    staleTime: Infinity,
    queryFn: fetchDashboardApiCollections
  })
}

export function useDashboardActivityQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard.activity,
    staleTime: STALE_TIME_QUARTER_HOURLY,
    queryFn: fetchDashboardActivity
  })
}
