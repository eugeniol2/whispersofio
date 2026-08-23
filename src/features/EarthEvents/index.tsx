'use client'

import {
  Alert,
  CircularProgress,
  Container,
  Stack,
  Typography
} from '@mui/material'
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
import { EventsErrorState } from './components/EventsErrorState'

const DEFAULT_LIMIT: EonetLimit = 30
const DEFAULT_TIME_RANGE: EonetTimeRange = 'today'

export function EarthEvents() {
  const [status, setStatus] = useState<EonetStatusFilter>('open')
  const [categoryId, setCategoryId] = useState('all')
  const [limit, setLimit] = useState<EonetLimit>(DEFAULT_LIMIT)
  const [timeRange, setTimeRange] = useState<EonetTimeRange>(DEFAULT_TIME_RANGE)

  const categoriesQuery = useEonetCategoriesQuery()
  const eventsQuery = useEonetEventsQuery({
    status,
    categoryId,
    limit,
    timeRange
  })

  const availabilityQuery = useEonetCategoryAvailabilityQuery({
    status,
    timeRange
  })

  const categoryOptions = availabilityQuery.data
    ? (categoriesQuery.data ?? []).filter(cat =>
        availabilityQuery.data.includes(cat.id)
      )
    : (categoriesQuery.data ?? [])

  // Filters apply on change, so both the events request and the category
  // availability probes have to feed the same busy indicator.
  const isUpdating = eventsQuery.isFetching || availabilityQuery.isFetching

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
          Track natural events happening around the globe — wildfires, storms,
          volcanoes, and more — sourced from NASA&apos;s Earth Observatory
          Natural Event Tracker.
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
        loading={isUpdating}
      />

      {eventsQuery.isError ? (
        <EventsErrorState
          error={eventsQuery.error}
          onRetry={() => eventsQuery.refetch()}
          retrying={eventsQuery.isFetching}
        />
      ) : eventsQuery.isPending ? (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : eventsQuery.data.length === 0 ? (
        <Alert severity="info">
          No events found for this status/category combination.
        </Alert>
      ) : (
        <Stack
          spacing={2}
          aria-busy={eventsQuery.isFetching}
          sx={{
            transition: 'opacity 0.2s ease',
            opacity: eventsQuery.isFetching ? 0.45 : 1,
            pointerEvents: eventsQuery.isFetching ? 'none' : 'auto'
          }}
        >
          {eventsQuery.data.map(event => (
            <EarthEventCard key={event.id} event={event} />
          ))}
        </Stack>
      )}
    </Container>
  )
}
