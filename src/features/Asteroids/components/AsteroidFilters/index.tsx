'use client'

import { Card, MenuItem, Stack, TextField } from '@mui/material'

import type {
  AsteroidHazardFilter,
  AsteroidRange,
  AsteroidSort
} from '@/services/api/asteroids/types'

interface AsteroidFiltersProps {
  range: AsteroidRange
  onRangeChange: (range: AsteroidRange) => void
  hazard: AsteroidHazardFilter
  onHazardChange: (hazard: AsteroidHazardFilter) => void
  sort: AsteroidSort
  onSortChange: (sort: AsteroidSort) => void
}

export const AsteroidFilters = ({
  range,
  onRangeChange,
  hazard,
  onHazardChange,
  sort,
  onSortChange
}: AsteroidFiltersProps) => (
  <Card sx={{ p: 3, mb: 4 }}>
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={4}
      sx={{ '& > *': { flex: 1 } }}
    >
      <TextField
        select
        size="small"
        label="Time Range"
        value={range}
        onChange={event => onRangeChange(event.target.value as AsteroidRange)}
      >
        <MenuItem value="today">Today</MenuItem>
        <MenuItem value="3days">Next 3 Days</MenuItem>
        <MenuItem value="7days">Next 7 Days</MenuItem>
      </TextField>

      <TextField
        select
        size="small"
        label="Show"
        value={hazard}
        onChange={event =>
          onHazardChange(event.target.value as AsteroidHazardFilter)
        }
      >
        <MenuItem value="all">All Objects</MenuItem>
        <MenuItem value="hazardous">Potentially Hazardous</MenuItem>
      </TextField>

      <TextField
        select
        size="small"
        label="Sort By"
        value={sort}
        onChange={event => onSortChange(event.target.value as AsteroidSort)}
      >
        <MenuItem value="closest">Closest Approach</MenuItem>
        <MenuItem value="largest">Largest Diameter</MenuItem>
        <MenuItem value="fastest">Highest Velocity</MenuItem>
      </TextField>
    </Stack>
  </Card>
)
