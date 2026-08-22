'use client'

import SearchIcon from '@mui/icons-material/Search'
import { Button, Card, MenuItem, Stack, TextField } from '@mui/material'

import type {
  EonetCategory,
  EonetLimit,
  EonetStatusFilter,
  EonetTimeRange
} from '@/services/api/eonet/types'

interface EarthEventsControlsProps {
  status: EonetStatusFilter
  onStatusChange: (status: EonetStatusFilter) => void
  categoryId: string
  onCategoryChange: (categoryId: string) => void
  categoryOptions: EonetCategory[]
  limit: EonetLimit
  onLimitChange: (limit: EonetLimit) => void
  timeRange: EonetTimeRange
  onTimeRangeChange: (timeRange: EonetTimeRange) => void
  onSearch: () => void
  loading?: boolean
}

export const EarthEventsControls = ({
  status,
  onStatusChange,
  categoryId,
  onCategoryChange,
  categoryOptions,
  limit,
  onLimitChange,
  timeRange,
  onTimeRangeChange,
  onSearch,
  loading = false
}: EarthEventsControlsProps) => (
  <Card sx={{ p: 3, mb: 4 }}>
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      justifyContent="space-between"
      spacing={2}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          select
          label="Status"
          size="small"
          value={status}
          onChange={event =>
            onStatusChange(event.target.value as EonetStatusFilter)
          }
          sx={{ width: { sm: 160 } }}
        >
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
          <MenuItem value="all">All</MenuItem>
        </TextField>
        <TextField
          select
          label="Category"
          size="small"
          value={categoryId}
          onChange={event => onCategoryChange(event.target.value)}
          sx={{ width: { sm: 220 } }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categoryOptions.map(cat => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Rows"
          size="small"
          value={limit}
          onChange={event =>
            onLimitChange(
              event.target.value === 'unlimited'
                ? 'unlimited'
                : (Number(event.target.value) as EonetLimit)
            )
          }
          sx={{ width: { sm: 140 } }}
        >
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={200}>200</MenuItem>
          <MenuItem value="unlimited">Unlimited</MenuItem>
        </TextField>
        <TextField
          select
          label="Time Range"
          size="small"
          value={timeRange}
          onChange={event =>
            onTimeRangeChange(event.target.value as EonetTimeRange)
          }
          sx={{ width: { sm: 160 } }}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="week">This Week</MenuItem>
          <MenuItem value="month">1 Month</MenuItem>
          <MenuItem value="all">All</MenuItem>
        </TextField>
      </Stack>

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={onSearch}
        disabled={loading}
      >
        Search
      </Button>
    </Stack>
  </Card>
)
