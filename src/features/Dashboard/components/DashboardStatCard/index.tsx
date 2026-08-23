import { Card, Stack, Typography } from '@mui/material'

import type { DashboardStat } from '@/services/api/dashboard/types'
import theme from '@/theme/theme'

import { dashboardIcons } from '../icons'

interface DashboardStatCardProps {
  stat: DashboardStat
}

export const DashboardStatCard = ({ stat }: DashboardStatCardProps) => {
  const Icon = dashboardIcons[stat.icon]

  return (
    <Card
      sx={{
        p: 2.5,
        transition: 'none',
        '&:hover': {
          transform: 'none',
          borderColor: 'rgba(74, 30, 106, 0.5)'
        }
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            background: 'rgba(0, 194, 194, 0.12)',
            color: theme.palette.secondary.main,
            flexShrink: 0
          }}
        >
          <Icon />
        </Stack>
        <Stack>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {stat.value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {stat.label}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}
