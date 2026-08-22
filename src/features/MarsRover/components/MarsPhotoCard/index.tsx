import { Card, CardContent, Typography } from '@mui/material'

import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import type { MarsPhoto } from '@/services/api/marsRover/types'
import theme from '@/theme/theme'

interface MarsPhotoCardProps {
  photo: MarsPhoto
}

export const MarsPhotoCard = ({ photo }: MarsPhotoCardProps) => (
  <Card>
    <ImagePlaceholder label={photo.camera.fullName} height={160} />
    <CardContent>
      <Typography
        variant="caption"
        sx={{ color: theme.palette.secondary.main }}
      >
        Sol {photo.sol} · {photo.earthDate}
      </Typography>
      <Typography variant="h6" sx={{ mt: 0.5 }}>
        {photo.camera.name}
      </Typography>
    </CardContent>
  </Card>
)
