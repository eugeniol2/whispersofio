import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Box, Stack, Typography } from '@mui/material'

import type { ApodEntry } from '@/services/api/apod/types'
import theme from '@/theme/theme'

interface ApodMediaProps {
  entry: ApodEntry
  height: number
  interactive?: boolean
}

// Painting a frame means downloading the whole mp4, so only small files are
// previewed. Anything larger falls back to the video tile.
const PREVIEWABLE_VIDEO_BYTES = 3 * 1024 * 1024

const VideoTile = ({ title, height }: { title: string; height: number }) => (
  <Stack
    alignItems="center"
    justifyContent="center"
    spacing={1}
    sx={{
      height,
      px: 3,
      textAlign: 'center',
      background:
        'radial-gradient(circle at 50% 35%, rgba(0, 194, 194, 0.18), transparent 60%), linear-gradient(145deg, #16163f, #0A0A2A)',
      borderBottom: `1px solid ${theme.palette.border.mainBorder}`
    }}
  >
    <PlayCircleOutlineIcon
      sx={{ fontSize: height > 220 ? 56 : 40, color: theme.palette.secondary.main }}
    />
    <Typography
      variant="caption"
      sx={{
        letterSpacing: 2,
        fontWeight: 700,
        color: theme.palette.secondary.main
      }}
    >
      VIDEO
    </Typography>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}
    >
      {title}
    </Typography>
  </Stack>
)

export const ApodMedia = ({
  entry,
  height,
  interactive = false
}: ApodMediaProps) => {
  const frame = {
    width: '100%',
    height,
    display: 'block',
    border: 0,
    background: theme.palette.common.black,
    borderBottom: `1px solid ${theme.palette.border.mainBorder}`
  }

  if (entry.mediaType === 'image') {
    // `url` is the web-sized render; `hdurl` runs to several megabytes and is
    // offered as an explicit action instead of blocking the card.
    return (
      <Box
        component="img"
        src={entry.url}
        alt={entry.title}
        loading="lazy"
        sx={{ ...frame, objectFit: 'cover' }}
      />
    )
  }

  if (entry.mediaType === 'video') {
    if (interactive) {
      return entry.isYouTube ? (
        <Box
          component="iframe"
          src={entry.url}
          title={entry.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={frame}
        />
      ) : (
        <Box
          component="video"
          src={entry.url}
          poster={entry.thumbnailUrl ?? undefined}
          controls
          preload="metadata"
          sx={frame}
        />
      )
    }

    if (entry.thumbnailUrl) {
      return (
        <Box
          component="img"
          src={entry.thumbnailUrl}
          alt={entry.title}
          loading="lazy"
          sx={{ ...frame, objectFit: 'cover' }}
        />
      )
    }

    const previewable =
      entry.videoSizeBytes !== null &&
      entry.videoSizeBytes <= PREVIEWABLE_VIDEO_BYTES

    if (previewable) {
      return (
        <Box
          component="video"
          src={entry.url}
          preload="metadata"
          muted
          playsInline
          sx={{ ...frame, objectFit: 'cover' }}
        />
      )
    }

    return <VideoTile title={entry.title} height={height} />
  }

  return <VideoTile title={entry.title} height={height} />
}
