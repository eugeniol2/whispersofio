'use client'

import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography
} from '@mui/material'
import { useMemo, useState } from 'react'

import { useAsteroidFeedQuery } from '@/services/api/asteroids/queries'
import type {
  Asteroid,
  AsteroidHazardFilter,
  AsteroidRange,
  AsteroidSort
} from '@/services/api/asteroids/types'

import { AsteroidCard } from './components/AsteroidCard'
import { AsteroidDetailDialog } from './components/AsteroidDetailDialog'
import { AsteroidFilters } from './components/AsteroidFilters'
import { AsteroidStats } from './components/AsteroidStats'

export function Asteroids() {
  const [range, setRange] = useState<AsteroidRange>('today')
  const [hazard, setHazard] = useState<AsteroidHazardFilter>('all')
  const [sort, setSort] = useState<AsteroidSort>('closest')
  const [selected, setSelected] = useState<Asteroid | null>(null)

  const feedQuery = useAsteroidFeedQuery(range)

  const visible = useMemo(() => {
    if (!feedQuery.data) return []

    const filtered =
      hazard === 'hazardous'
        ? feedQuery.data.asteroids.filter(item => item.isHazardous)
        : feedQuery.data.asteroids

    return [...filtered].sort((a, b) => {
      if (sort === 'largest') return b.diameterMaxM - a.diameterMaxM
      if (sort === 'fastest') return b.velocityKph - a.velocityKph
      return a.missDistanceKm - b.missDistanceKm
    })
  }, [feedQuery.data, hazard, sort])

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Stack
        spacing={1}
        alignItems="center"
        textAlign="center"
        sx={{ pt: 4, pb: 4 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Near-Earth Asteroids
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 660 }}
        >
          Objects making a close approach to Earth, tracked by NASA&apos;s
          Center for Near-Earth Object Studies. Distances are shown in lunar
          distances — 1 LD is the distance from Earth to the Moon.
        </Typography>
      </Stack>

      <AsteroidFilters
        range={range}
        onRangeChange={setRange}
        hazard={hazard}
        onHazardChange={setHazard}
        sort={sort}
        onSortChange={setSort}
      />

      {feedQuery.isError ? (
        <Alert severity="error">Failed to load asteroid data.</Alert>
      ) : feedQuery.isPending ? (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <>
          <AsteroidStats feed={feedQuery.data} />

          {visible.length === 0 ? (
            <Alert severity="info">
              No potentially hazardous objects in this time range.
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {visible.map(asteroid => (
                <Grid key={asteroid.key} item xs={12} sm={6} md={4}>
                  <AsteroidCard asteroid={asteroid} onSelect={setSelected} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      <AsteroidDetailDialog
        asteroid={selected}
        onClose={() => setSelected(null)}
      />
    </Container>
  )
}
