'use client'

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Link,
  Stack,
  Typography
} from '@mui/material'
import { useState } from 'react'

import {
  useApodQuery,
  useApodStatsQuery,
  useRecentApodsQuery
} from '@/services/api/apod/queries'

import { ApodControls } from './components/ApodControls'
import { ApodFeaturedCard } from './components/ApodFeaturedCard'
import { ApodStats } from './components/ApodStats'
import { ApodThumbnailCard } from './components/ApodThumbnailCard'

const DEFAULT_DATE = '2025-01-15'

export function Apod() {
  const [draftDate, setDraftDate] = useState(DEFAULT_DATE)
  const [committedDate, setCommittedDate] = useState(DEFAULT_DATE)
  const [mode, setMode] = useState<'date' | 'random'>('date')
  const [randomToken, setRandomToken] = useState(0)

  const featuredQuery = useApodQuery({
    mode,
    date: committedDate,
    randomToken
  })
  const recentQuery = useRecentApodsQuery()
  const statsQuery = useApodStatsQuery()

  const handleGetApod = () => {
    setMode('date')
    setCommittedDate(draftDate)
  }

  const handleRandom = () => {
    setMode('random')
    setRandomToken(token => token + 1)
  }

  const archiveLoading = recentQuery.isPending || statsQuery.isPending
  const archiveError = recentQuery.isError || statsQuery.isError

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Stack
        spacing={1}
        alignItems="center"
        textAlign="center"
        sx={{ pt: 4, pb: 4 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Astronomy Picture of the Day
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600 }}
        >
          Discover the cosmos! Each day a different image or photograph of our
          fascinating universe is featured.
        </Typography>
      </Stack>

      <ApodControls
        date={draftDate}
        onDateChange={setDraftDate}
        onGetApod={handleGetApod}
        onRandom={handleRandom}
        loading={featuredQuery.isFetching}
      />

      {featuredQuery.isError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          Failed to load the Astronomy Picture of the Day. Please try again.
        </Alert>
      )}

      <Box sx={{ mb: 5 }}>
        {featuredQuery.isPending || !featuredQuery.data ? (
          <Stack alignItems="center" sx={{ py: 8 }}>
            <CircularProgress color="secondary" />
          </Stack>
        ) : (
          <ApodFeaturedCard entry={featuredQuery.data} />
        )}
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Recent APOD Images
        </Typography>
        <Link href="#" underline="hover" color="secondary">
          View Archive
        </Link>
      </Stack>

      {archiveError && (
        <Alert severity="error" sx={{ mb: 4 }}>
          Failed to load the APOD archive.
        </Alert>
      )}

      {archiveLoading ? (
        <Stack alignItems="center" sx={{ py: 6, mb: 5 }}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <>
          <Grid container spacing={3} sx={{ mb: 5 }}>
            {(recentQuery.data ?? []).map(entry => (
              <Grid key={entry.id} item xs={12} sm={6} md={4}>
                <ApodThumbnailCard entry={entry} />
              </Grid>
            ))}
          </Grid>

          <ApodStats stats={statsQuery.data ?? []} />
        </>
      )}
    </Container>
  )
}
