import CloseIcon from '@mui/icons-material/Close'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Typography
} from '@mui/material'

import { useNasaMediaVideoQuery } from '@/services/api/nasaImages/queries'
import type { NasaMediaItem } from '@/services/api/nasaImages/types'
import theme from '@/theme/theme'
import { formatArchiveDate } from '@/utils/formatArchiveDate'

interface MediaDetailDialogProps {
  item: NasaMediaItem | null
  onClose: () => void
}

export const MediaDetailDialog = ({
  item,
  onClose
}: MediaDetailDialogProps) => {
  const isVideo = item?.mediaType === 'video'
  const videoQuery = useNasaMediaVideoQuery(isVideo && item ? item.id : null)

  if (!item) return null

  const date = formatArchiveDate(item.dateCreated)

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth scroll="body">
      <Box sx={{ position: 'relative' }}>
        {isVideo ? (
          videoQuery.isPending ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ height: 320, background: theme.palette.common.black }}
            >
              <CircularProgress color="secondary" />
            </Stack>
          ) : videoQuery.data ? (
            <Box
              component="video"
              src={videoQuery.data}
              poster={item.previewUrl ?? undefined}
              controls
              preload="metadata"
              sx={{
                width: '100%',
                maxHeight: 460,
                display: 'block',
                background: theme.palette.common.black
              }}
            />
          ) : (
            <Stack sx={{ background: theme.palette.common.black }}>
              {item.previewUrl && (
                <Box
                  component="img"
                  src={item.previewUrl}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    maxHeight: 460,
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              )}
              <Alert severity="info" sx={{ borderRadius: 0 }}>
                NASA does not publish a playable file for this video.
              </Alert>
            </Stack>
          )
        ) : (
          item.previewUrl && (
            <Box
              component="img"
              src={item.previewUrl}
              alt={item.title}
              sx={{
                width: '100%',
                maxHeight: 460,
                objectFit: 'contain',
                display: 'block',
                background: theme.palette.common.black
              }}
            />
          )
        )}
        <IconButton
          onClick={onClose}
          aria-label="Close"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'rgba(10, 10, 42, 0.7)',
            color: theme.palette.common.white,
            '&:hover': { background: 'rgba(10, 10, 42, 0.9)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
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
              <Chip label={item.center} size="small" variant="outlined" />
            )}
            <Chip
              label={item.mediaType === 'video' ? 'Video' : 'Image'}
              size="small"
              variant="outlined"
            />
          </Stack>

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {item.title}
          </Typography>

          {item.description && (
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          )}

          {item.keywords.length > 0 && (
            <>
              <Divider sx={{ borderColor: theme.palette.border.mainBorder }} />
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {item.keywords.slice(0, 12).map(keyword => (
                  <Chip key={keyword} label={keyword} size="small" />
                ))}
              </Stack>
            </>
          )}

          <Button
            variant="outlined"
            color="secondary"
            endIcon={<OpenInNewIcon />}
            href={item.detailUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ alignSelf: 'flex-start' }}
          >
            View on NASA Image Library
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
