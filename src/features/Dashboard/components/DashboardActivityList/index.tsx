import { Box, Divider, Paper, Stack, Typography } from '@mui/material'

import type { DashboardActivityItem } from '@/services/api/dashboard/types'
import theme from '@/theme/theme'

import { dashboardIcons } from '../icons'

interface DashboardActivityListProps {
  items: DashboardActivityItem[]
}

// Uses Paper rather than Card here — Card's theme-wide hover lift makes
// sense for a single clickable surface, but this list holds several
// independently-clickable rows, so the whole block lifting on hover
// (regardless of which row you're over) reads as broken rather than
// interactive. Each row gets its own hover highlight instead.
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
            component="a"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
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
