import { HydrationBoundary } from '@tanstack/react-query'

import { Dashboard } from '@/features/Dashboard'
import type { ApodApiResponse } from '@/services/api/apod/requests'
import {
  APOD_RECENT_DAYS,
  getApodRangeDates,
  toApodEntry
} from '@/services/api/apod/requests'
import { getApod } from '@/services/api/apod/server'
import type { NasaApodApiResponse } from '@/services/api/dashboard/requests'
import {
  fetchDashboardApiCollections,
  toDashboardActivity,
  toDashboardFeaturedContent,
  toDashboardStats
} from '@/services/api/dashboard/requests'
import { getDashboardActivity } from '@/services/api/dashboard/server'
import { getDashboardStats } from '@/services/api/dashboard/statsServer'
import { createDehydratedState } from '@/services/api/prefetch'
import { queryKeys } from '@/services/api/queryKeys'

export const revalidate = 900

export default async function DashboardPage() {
  const state = await createDehydratedState([
    async queryClient => {
      const { data } = await getApod({})
      queryClient.setQueryData(
        queryKeys.dashboard.featuredContent,
        toDashboardFeaturedContent(data as NasaApodApiResponse)
      )
    },
    async queryClient => {
      const { data } = await getDashboardActivity()
      queryClient.setQueryData(
        queryKeys.dashboard.activity,
        toDashboardActivity(data)
      )
    },
    async queryClient => {
      queryClient.setQueryData(
        queryKeys.dashboard.apiCollections,
        await fetchDashboardApiCollections()
      )
    },
    async queryClient => {
      const { data } = await getDashboardStats()
      queryClient.setQueryData(
        queryKeys.dashboard.stats,
        toDashboardStats(data)
      )
    },
    async queryClient => {
      const { start, end } = getApodRangeDates(APOD_RECENT_DAYS)
      const { data } = await getApod({ start, end })
      queryClient.setQueryData(
        queryKeys.apod.recent,
        (data as ApodApiResponse[]).map(toApodEntry).reverse()
      )
    }
  ])

  return (
    <HydrationBoundary state={state}>
      <Dashboard />
    </HydrationBoundary>
  )
}
