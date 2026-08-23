'use client'

import RefreshIcon from '@mui/icons-material/Refresh'
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt'
import TimerIcon from '@mui/icons-material/Timer'
import { Button, Card, Stack, Typography } from '@mui/material'

import { ApiError } from '@/services/api/client'
import theme from '@/theme/theme'

interface EventsErrorStateProps {
  error: unknown
  onRetry: () => void
  retrying?: boolean
}

export const EventsErrorState = ({
  error,
  onRetry,
  retrying = false
}: EventsErrorStateProps) => {
  const rateLimited = error instanceof ApiError && error.status === 429
  const Icon = rateLimited ? TimerIcon : SatelliteAltIcon

  return (
    <Card sx={{ p: 5 }}>
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(255, 167, 38, 0.12)',
            color: theme.palette.warning.main
          }}
        >
          <Icon sx={{ fontSize: 32 }} />
        </Stack>

        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {rateLimited
            ? 'NASA is throttling us for a moment'
            : "Couldn't reach NASA's event tracker"}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 460 }}
        >
          {rateLimited
            ? 'EONET allows 60 requests per minute and this browser just used them up. The allowance refills on its own — give it a few seconds.'
            : 'The Earth Observatory Natural Event Tracker did not answer. This is usually temporary and a retry tends to fix it.'}
        </Typography>

        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          loading={retrying}
          loadingPosition="start"
        >
          Try Again
        </Button>
      </Stack>
    </Card>
  )
}
