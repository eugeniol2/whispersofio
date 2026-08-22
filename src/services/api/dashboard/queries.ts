'use client'

import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import {
  fetchDashboardActivity,
  fetchDashboardApiCollections,
  fetchDashboardFeaturedContent,
  fetchDashboardStats
} from './requests'

export function useDashboardStatsQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats,
    queryFn: fetchDashboardStats
  })
}

export function useDashboardFeaturedContentQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard.featuredContent,
    queryFn: fetchDashboardFeaturedContent
  })
}

export function useDashboardApiCollectionsQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard.apiCollections,
    queryFn: fetchDashboardApiCollections
  })
}

export function useDashboardActivityQuery() {
  return useQuery({
    queryKey: queryKeys.dashboard.activity,
    queryFn: fetchDashboardActivity
  })
}
