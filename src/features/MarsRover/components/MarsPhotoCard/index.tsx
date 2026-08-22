import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'

import type { MarsPhoto } from '@/services/api/marsRover/types'
import theme from '@/theme/theme'

interface MarsPhotoCardProps {
  photo: MarsPhoto
}

export const MarsPhotoCard = ({ photo }: MarsPhotoCardProps) => (
  <Card>
    <CardActionArea
      href={photo.fullImageUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Box
        component="img"
        src={photo.imageUrl}
        alt={`${photo.camera.fullName} — Sol ${photo.sol}`}
        loading="lazy"
        sx={{
          width: '100%',
          height: 220,
          objectFit: 'cover',
          display: 'block',
          background:
            'linear-gradient(135deg, rgba(74, 30, 106, 0.4), rgba(0, 194, 194, 0.15))',
          borderBottom: `1px solid ${theme.palette.border.mainBorder}`
        }}
      />
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
        <Typography variant="body2" color="text.secondary">
          {photo.camera.fullName}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
)
