'use client'

import SearchIcon from '@mui/icons-material/Search'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import { Button, Card, Stack, TextField, Typography } from '@mui/material'

interface ApodControlsProps {
  date: string
  onDateChange: (date: string) => void
  maxDate: string
  onGetApod: () => void
  onRandom: () => void
  loading?: boolean
}

export const ApodControls = ({
  date,
  onDateChange,
  maxDate,
  onGetApod,
  onRandom,
  loading = false
}: ApodControlsProps) => (
  <Card sx={{ p: 3, mb: 4 }}>
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      justifyContent="space-between"
      spacing={2}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="body2" color="text.secondary">
          Select Date:
        </Typography>
        <TextField
          type="date"
          size="small"
          value={date}
          onChange={event => onDateChange(event.target.value)}
          slotProps={{ htmlInput: { min: '1995-06-16', max: maxDate } }}
        />
      </Stack>
      <Stack direction="row" spacing={1.5}>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={onGetApod}
          disabled={loading}
        >
          Get APOD
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ShuffleIcon />}
          onClick={onRandom}
          disabled={loading}
        >
          Random
        </Button>
      </Stack>
    </Stack>
  </Card>
)
