'use client'

import { Alert, CircularProgress, Container, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import {
  useEonetCategoriesQuery,
  useEonetCategoryAvailabilityQuery,
  useEonetEventsQuery
} from '@/services/api/eonet/queries'
import type {
  EonetCategoryId,
  EonetLimit,
  EonetStatusFilter,
  EonetTimeRange
} from '@/services/api/eonet/types'

import { EarthEventCard } from './components/EarthEventCard'
import { EarthEventsControls } from './components/EarthEventsControls'

const DEFAULT_LIMIT: EonetLimit = 30
const DEFAULT_TIME_RANGE: EonetTimeRange = 'today'

export function EarthEvents() {
  const [status, setStatus] = useState<EonetStatusFilter>('open')
  const [categoryId, setCategoryId] = useState('all')
  const [limit, setLimit] = useState<EonetLimit>(DEFAULT_LIMIT)
  const [timeRange, setTimeRange] =
    useState<EonetTimeRange>(DEFAULT_TIME_RANGE)

  const categoriesQuery = useEonetCategoriesQuery()
  const eventsQuery = useEonetEventsQuery({
    status,
    categoryId,
    limit,
    timeRange
  })

  const allCategoryIds = categoriesQuery.data?.map(cat => cat.id) ?? []
  const availabilityQuery = useEonetCategoryAvailabilityQuery({
    status,
    timeRange,
    categoryIds: allCategoryIds
  })

  const categoryOptions = availabilityQuery.data
    ? (categoriesQuery.data ?? []).filter(cat =>
        availabilityQuery.data.includes(cat.id)
      )
    : (categoriesQuery.data ?? [])

  // If the selected category has no events under the new status/time
  // range, it disappears from the options above — fall back to "all"
  // rather than leaving a hidden, stale selection in place.
  useEffect(() => {
    if (
      categoryId !== 'all' &&
      availabilityQuery.data &&
      !availabilityQuery.data.includes(categoryId as EonetCategoryId)
    ) {
      setCategoryId('all')
    }
  }, [categoryId, availabilityQuery.data])

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Stack
        spacing={1}
        alignItems="center"
        textAlign="center"
        sx={{ pt: 4, pb: 4 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Earth Events
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 640 }}
        >
          Track natural events happening around the globe — wildfires,
          storms, volcanoes, and more — sourced from NASA&apos;s Earth
          Observatory Natural Event Tracker.
        </Typography>
      </Stack>

      <EarthEventsControls
        status={status}
        onStatusChange={setStatus}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        categoryOptions={categoryOptions}
        limit={limit}
        onLimitChange={setLimit}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />

      {eventsQuery.isError ? (
        <Alert severity="error">Failed to load Earth events.</Alert>
      ) : eventsQuery.isPending ? (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : eventsQuery.data.length === 0 ? (
        <Alert severity="info">
          No events found for this status/category combination.
        </Alert>
      ) : (
        <Stack spacing={2}>
          {eventsQuery.data.map(event => (
            <EarthEventCard key={event.id} event={event} />
          ))}
        </Stack>
      )}
    </Container>
  )
}
