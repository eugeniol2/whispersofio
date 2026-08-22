import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import type { DashboardActivityItem } from '@/services/api/dashboard/types'
import theme from '@/theme/theme'

import { dashboardIcons } from '../icons'

interface DashboardActivityListProps {
  items: DashboardActivityItem[]
}

export const DashboardActivityList = ({
  items
}: DashboardActivityListProps) => (
  <Paper
    sx={{
      background: 'linear-gradient(145deg, #121240, #0A0A2A)',
      borderRadius: '16px',
      border: '1px solid rgba(74, 30, 106, 0.5)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden'
    }}
  >
    {items.map((item, index) => {
      const Icon = dashboardIcons[item.icon]

      return (
        <Stack key={item.id}>
          <Box
            component={Link}
            href={`/earth-events/${item.id}`}
            sx={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'background 0.2s ease',
              '&:hover': {
                background: 'rgba(0, 194, 194, 0.08)'
              }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ p: 2.5 }}
            >
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(0, 194, 194, 0.12)',
                  color: theme.palette.secondary.main,
                  flexShrink: 0
                }}
              >
                <Icon fontSize="small" />
              </Stack>
              <Stack>
                <Typography variant="body1">{item.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.timestamp}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          {index < items.length - 1 && (
            <Divider sx={{ borderColor: theme.palette.border.mainBorder }} />
          )}
        </Stack>
      )
    })}
  </Paper>
)
