import { Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material'

import type { ApodEntry } from '@/services/api/apod/types'
import theme from '@/theme/theme'
import { getApodPageUrl } from '@/utils/getApodPageUrl'

import { ApodMedia } from '../ApodMedia'

interface ApodThumbnailCardProps {
  entry: ApodEntry
}

export const ApodThumbnailCard = ({ entry }: ApodThumbnailCardProps) => (
  <Card sx={{ height: '100%' }}>
    <CardActionArea
      href={getApodPageUrl(entry.date)}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
    >
      <ApodMedia entry={entry} height={160} />
      <CardContent sx={{ flexGrow: 1, width: '100%' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.secondary.main }}
          >
            {entry.date}
          </Typography>
          {entry.mediaType === 'video' && (
            <Chip
              label="Video"
              size="small"
              variant="outlined"
              sx={{ height: 18, fontSize: 10 }}
            />
          )}
        </Stack>
        <Typography
          variant="h6"
          sx={{
            mt: 0.5,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {entry.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {entry.description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
)
