import { Box, Card, Stack, Typography } from '@mui/material'

import type { AsteroidFeed } from '@/services/api/asteroids/types'
import theme from '@/theme/theme'
import { formatCompactNumber } from '@/utils/formatCompactNumber'

interface AsteroidStatsProps {
  feed: AsteroidFeed
}

export const AsteroidStats = ({ feed }: AsteroidStatsProps) => {
  const closest = feed.asteroids[0]
  const largest = [...feed.asteroids].sort(
    (a, b) => b.diameterMaxM - a.diameterMaxM
  )[0]

  const stats = [
    {
      label: 'Objects Tracked',
      value: formatCompactNumber(feed.total),
      accent: theme.palette.secondary.main
    },
    {
      label: 'Potentially Hazardous',
      value: formatCompactNumber(feed.hazardousCount),
      accent:
        feed.hazardousCount > 0
          ? theme.palette.warning.main
          : theme.palette.secondary.main
    },
    {
      label: 'Closest Approach',
      value: closest
        ? `${formatCompactNumber(closest.missDistanceLunar, 1)} LD`
        : '—',
      accent: theme.palette.secondary.main
    },
    {
      label: 'Largest Diameter',
      value: largest
        ? `${formatCompactNumber(largest.diameterMaxM)} m`
        : '—',
      accent: theme.palette.secondary.main
    }
  ]

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4
      }}
    >
      {stats.map(stat => (
        <Card key={stat.label} sx={{ p: 3 }}>
          <Stack spacing={0.5}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: stat.accent }}
            >
              {stat.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {stat.label}
            </Typography>
          </Stack>
        </Card>
      ))}
    </Box>
  )
}
