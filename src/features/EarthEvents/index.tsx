'use client'

import { Alert, CircularProgress, Container, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import {
  useEonetCategoriesQuery,
  useEonetEventsQuery
} from '@/services/api/eonet/queries'
import type {
  EonetLimit,
  EonetStatusFilter
} from '@/services/api/eonet/types'

import { EarthEventCard } from './components/EarthEventCard'
import { EarthEventsControls } from './components/EarthEventsControls'

const DEFAULT_LIMIT: EonetLimit = 30

export function EarthEvents() {
  const [draftStatus, setDraftStatus] = useState<EonetStatusFilter>('open')
  const [draftCategory, setDraftCategory] = useState('all')
  const [draftLimit, setDraftLimit] = useState<EonetLimit>(DEFAULT_LIMIT)
  const [status, setStatus] = useState<EonetStatusFilter>('open')
  const [categoryId, setCategoryId] = useState('all')
  const [limit, setLimit] = useState<EonetLimit>(DEFAULT_LIMIT)

  const categoriesQuery = useEonetCategoriesQuery()
  const eventsQuery = useEonetEventsQuery({ status, categoryId, limit })

  const handleSearch = () => {
    setStatus(draftStatus)
    setCategoryId(draftCategory)
    setLimit(draftLimit)
  }

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
        status={draftStatus}
        onStatusChange={setDraftStatus}
        categoryId={draftCategory}
        onCategoryChange={setDraftCategory}
        categoryOptions={categoriesQuery.data ?? []}
        limit={draftLimit}
        onLimitChange={setDraftLimit}
        onSearch={handleSearch}
        loading={eventsQuery.isFetching}
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
