import { HydrationBoundary } from '@tanstack/react-query'

import { EarthEvents } from '@/features/EarthEvents'
import {
  fetchAvailableCategoryIds,
  fetchEonetCategories,
  fetchEonetEvents
} from '@/services/api/eonet/requests'
import type {
  EonetLimit,
  EonetStatusFilter,
  EonetTimeRange
} from '@/services/api/eonet/types'
import { createDehydratedState } from '@/services/api/prefetch'
import { queryKeys } from '@/services/api/queryKeys'

const DEFAULT_STATUS: EonetStatusFilter = 'open'
const DEFAULT_CATEGORY = 'all'
const DEFAULT_LIMIT: EonetLimit = 30
const DEFAULT_TIME_RANGE: EonetTimeRange = 'today'

export const revalidate = 900

export default async function EarthEventsPage() {
  const state = await createDehydratedState([
    async queryClient => {
      const categories = await fetchEonetCategories()
      queryClient.setQueryData(queryKeys.eonet.categories, categories)

      const available = await fetchAvailableCategoryIds({
        status: DEFAULT_STATUS,
        timeRange: DEFAULT_TIME_RANGE,
        categoryIds: categories.map(category => category.id)
      })
      queryClient.setQueryData(
        queryKeys.eonet.categoryAvailability(
          DEFAULT_STATUS,
          DEFAULT_TIME_RANGE
        ),
        available
      )
    },
    async queryClient => {
      const events = await fetchEonetEvents({
        status: DEFAULT_STATUS,
        limit: DEFAULT_LIMIT,
        timeRange: DEFAULT_TIME_RANGE
      })
      queryClient.setQueryData(
        queryKeys.eonet.events(
          DEFAULT_STATUS,
          DEFAULT_CATEGORY,
          DEFAULT_LIMIT,
          DEFAULT_TIME_RANGE
        ),
        events
      )
    }
  ])

  return (
    <HydrationBoundary state={state}>
      <EarthEvents />
    </HydrationBoundary>
  )
}
