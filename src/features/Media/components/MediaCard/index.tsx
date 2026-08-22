import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography
} from '@mui/material'

import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import type { NasaMediaItem } from '@/services/api/nasaImages/types'
import theme from '@/theme/theme'
import { formatArchiveDate } from '@/utils/formatArchiveDate'

interface MediaCardProps {
  item: NasaMediaItem
  onSelect: (item: NasaMediaItem) => void
}

export const MediaCard = ({ item, onSelect }: MediaCardProps) => {
  const date = formatArchiveDate(item.dateCreated)

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea
        onClick={() => onSelect(item)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        }}
      >
        <Box sx={{ position: 'relative' }}>
          {item.thumbnailUrl ? (
            <Box
              component="img"
              src={item.thumbnailUrl}
              alt={item.title}
              loading="lazy"
              sx={{
                width: '100%',
                height: 190,
                objectFit: 'cover',
                display: 'block',
                background:
                  'linear-gradient(135deg, rgba(74, 30, 106, 0.4), rgba(0, 194, 194, 0.15))',
                borderBottom: `1px solid ${theme.palette.border.mainBorder}`
              }}
            />
          ) : (
            <ImagePlaceholder label={item.title} height={190} />
          )}

          {item.mediaType === 'video' && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(10, 10, 42, 0.35)',
                color: theme.palette.common.white
              }}
            >
              <PlayCircleOutlineIcon sx={{ fontSize: 48 }} />
            </Stack>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, width: '100%' }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 0.5 }}
          >
            {date && (
              <Typography
                variant="caption"
                sx={{ color: theme.palette.secondary.main }}
              >
                {date}
              </Typography>
            )}
            {item.center && (
              <Chip
                label={item.center}
                size="small"
                variant="outlined"
                sx={{ height: 20, fontSize: 10 }}
              />
            )}
          </Stack>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {item.title}
          </Typography>

          {item.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {item.description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
