import { Box, Card, Typography } from '@mui/material'

import type { ApodStat } from '@/services/api/apod/types'
import theme from '@/theme/theme'

interface ApodStatsProps {
  stats: ApodStat[]
}

export const ApodStats = ({ stats }: ApodStatsProps) => (
  <Card sx={{ p: 3 }}>
    <Typography variant="h6" sx={{ mb: 3 }}>
      APOD Statistics
    </Typography>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(4, 1fr)'
        },
        gap: 3
      }}
    >
      {stats.map(stat => (
        <Box key={stat.label} sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: theme.palette.secondary.main }}
          >
            {stat.value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stat.label}
          </Typography>
        </Box>
      ))}
    </Box>
  </Card>
)
