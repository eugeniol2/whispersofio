import { HydrationBoundary } from '@tanstack/react-query'

import { Apod } from '@/features/Apod'
import type { ApodApiResponse } from '@/services/api/apod/requests'
import {
  APOD_RECENT_DAYS,
  APOD_STATS_DAYS,
  buildApodStats,
  getApodRangeDates,
  toApodEntry
} from '@/services/api/apod/requests'
import { getApod } from '@/services/api/apod/server'
import { createDehydratedState } from '@/services/api/prefetch'
import { queryKeys } from '@/services/api/queryKeys'
import { getLatestApodDate } from '@/utils/getLatestApodDate'

export const revalidate = 3600

const toEntries = (data: unknown) =>
  (Array.isArray(data)
    ? (data as ApodApiResponse[])
    : [data as ApodApiResponse]
  )
    .map(toApodEntry)
    .reverse()

export default async function ApodPage() {
  const latestDate = getLatestApodDate()

  const state = await createDehydratedState([
    async queryClient => {
      const { data } = await getApod({ date: latestDate })
      queryClient.setQueryData(
        queryKeys.apod.byDate(latestDate),
        toApodEntry(data as ApodApiResponse)
      )
    },
    async queryClient => {
      const { start, end } = getApodRangeDates(APOD_RECENT_DAYS)
      const { data } = await getApod({ start, end })
      queryClient.setQueryData(queryKeys.apod.recent, toEntries(data))
    },
    async queryClient => {
      const { start, end } = getApodRangeDates(APOD_STATS_DAYS)
      const { data } = await getApod({ start, end })
      queryClient.setQueryData(
        queryKeys.apod.stats,
        buildApodStats(toEntries(data))
      )
    }
  ])

  return (
    <HydrationBoundary state={state}>
      <Apod />
    </HydrationBoundary>
  )
}
