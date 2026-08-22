'use client'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Link as MuiLink,
  Stack,
  Typography
} from '@mui/material'
import Link from 'next/link'

import {
  useDashboardActivityQuery,
  useDashboardApiCollectionsQuery,
  useDashboardFeaturedContentQuery,
  useDashboardStatsQuery
} from '@/services/api/dashboard/queries'

import { DashboardActivityList } from './components/DashboardActivityList'
import { DashboardCollectionCard } from './components/DashboardCollectionCard'
import { DashboardFeaturedCard } from './components/DashboardFeaturedCard'
import { DashboardStatCard } from './components/DashboardStatCard'

export function Dashboard() {
  const statsQuery = useDashboardStatsQuery()
  const featuredQuery = useDashboardFeaturedContentQuery()
  const collectionsQuery = useDashboardApiCollectionsQuery()
  const activityQuery = useDashboardActivityQuery()

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Stack
        spacing={1}
        alignItems="center"
        textAlign="center"
        sx={{ pt: 4, pb: 4 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Explore the Universe with NASA APIs
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 640 }}
        >
          Access real-time space data, stunning imagery, and scientific
          discoveries from NASA&apos;s comprehensive collection of APIs.
        </Typography>
      </Stack>

      {statsQuery.isError ? (
        <Alert severity="error" sx={{ mb: 5 }}>
          Failed to load dashboard stats.
        </Alert>
      ) : statsQuery.isPending ? (
        <Stack alignItems="center" sx={{ py: 4, mb: 5 }}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {statsQuery.data.map(stat => (
            <Grid key={stat.id} item xs={12} sm={4}>
              <DashboardStatCard stat={stat} />
            </Grid>
          ))}
        </Grid>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Featured Content
        </Typography>
        <MuiLink component={Link} href="/apod" underline="none">
          <ArrowForwardIcon sx={{ color: 'secondary.main' }} />
        </MuiLink>
      </Stack>

      <Box sx={{ mb: 5 }}>
        {featuredQuery.isError ? (
          <Alert severity="error">Failed to load featured content.</Alert>
        ) : featuredQuery.isPending ? (
          <Stack alignItems="center" sx={{ py: 6 }}>
            <CircularProgress color="secondary" />
          </Stack>
        ) : (
          <DashboardFeaturedCard content={featuredQuery.data} />
        )}
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        NASA API Collections
      </Typography>

      {collectionsQuery.isError ? (
        <Alert severity="error" sx={{ mb: 5 }}>
          Failed to load API collections.
        </Alert>
      ) : collectionsQuery.isPending ? (
        <Stack alignItems="center" sx={{ py: 6, mb: 5 }}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {collectionsQuery.data.map(collection => (
            <Grid key={collection.id} item xs={12} sm={6} md={4}>
              <DashboardCollectionCard collection={collection} />
            </Grid>
          ))}
        </Grid>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Recent Activity
        </Typography>
        <MuiLink href="#" underline="hover" color="secondary">
          View All
        </MuiLink>
      </Stack>

      {activityQuery.isError ? (
        <Alert severity="error">Failed to load recent activity.</Alert>
      ) : activityQuery.isPending ? (
        <Stack alignItems="center" sx={{ py: 6 }}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <DashboardActivityList items={activityQuery.data} />
      )}
    </Container>
  )
}
