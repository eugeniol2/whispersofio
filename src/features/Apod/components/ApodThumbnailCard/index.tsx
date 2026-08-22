import { Card, CardContent, Typography } from '@mui/material'

import type { ApodEntry } from '@/services/api/apod/types'
import theme from '@/theme/theme'

import { ApodImagePlaceholder } from '../ApodImagePlaceholder'

interface ApodThumbnailCardProps {
  entry: ApodEntry
}

export const ApodThumbnailCard = ({ entry }: ApodThumbnailCardProps) => (
  <Card>
    <ApodImagePlaceholder label={entry.title} height={160} />
    <CardContent>
      <Typography
        variant="caption"
        sx={{ color: theme.palette.secondary.main }}
      >
        {entry.date}
      </Typography>
      <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
        {entry.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {entry.description}
      </Typography>
    </CardContent>
  </Card>
)
