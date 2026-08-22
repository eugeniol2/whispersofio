'use client'

import SearchIcon from '@mui/icons-material/Search'
import {
  Card,
  Chip,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { nasaMediaTopics } from '@/services/api/nasaImages/topics'
import type { NasaMediaTypeFilter } from '@/services/api/nasaImages/types'
import theme from '@/theme/theme'

interface MediaFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  mediaType: NasaMediaTypeFilter
  onMediaTypeChange: (value: NasaMediaTypeFilter) => void
  activeTopicId: string | null
  onTopicSelect: (topicId: string) => void
}

export const MediaFilters = ({
  search,
  onSearchChange,
  mediaType,
  onMediaTypeChange,
  activeTopicId,
  onTopicSelect
}: MediaFiltersProps) => (
  <Card sx={{ p: 3, mb: 4 }}>
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{ mb: 3 }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
    >
      <TextField
        fullWidth
        size="small"
        label="Search the archive"
        placeholder="Apollo 11, Saturn V, spacewalk…"
        value={search}
        onChange={event => onSearchChange(event.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            )
          }
        }}
      />
      <TextField
        select
        size="small"
        label="Media"
        value={mediaType}
        onChange={event =>
          onMediaTypeChange(event.target.value as NasaMediaTypeFilter)
        }
        sx={{ minWidth: { sm: 160 } }}
      >
        <MenuItem value="all">All Media</MenuItem>
        <MenuItem value="image">Images</MenuItem>
        <MenuItem value="video">Video</MenuItem>
      </TextField>
    </Stack>

    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ display: 'block', mb: 1.5 }}
    >
      Browse by mission
    </Typography>

    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {nasaMediaTopics.map(topic => {
        const active = topic.id === activeTopicId

        return (
          <Chip
            key={topic.id}
            label={topic.label}
            onClick={() => onTopicSelect(topic.id)}
            variant={active ? 'filled' : 'outlined'}
            sx={{
              fontWeight: active ? 700 : 400,
              background: active ? theme.palette.secondary.main : undefined,
              color: active ? theme.palette.common.black : undefined,
              '&:hover': {
                background: active
                  ? theme.palette.secondary.main
                  : 'rgba(0, 194, 194, 0.12)'
              }
            }}
          />
        )
      })}
    </Stack>
  </Card>
)
