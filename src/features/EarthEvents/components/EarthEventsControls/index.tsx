'use client'

import SearchIcon from '@mui/icons-material/Search'
import { Button, Card, MenuItem, Stack, TextField } from '@mui/material'

import type {
  EonetCategory,
  EonetStatusFilter
} from '@/services/api/eonet/types'

interface EarthEventsControlsProps {
  status: EonetStatusFilter
  onStatusChange: (status: EonetStatusFilter) => void
  categoryId: string
  onCategoryChange: (categoryId: string) => void
  categoryOptions: EonetCategory[]
  onSearch: () => void
  loading?: boolean
}

export const EarthEventsControls = ({
  status,
  onStatusChange,
  categoryId,
  onCategoryChange,
  categoryOptions,
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
