import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { Box, Button, Card, Chip, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import type { DashboardFeaturedContent } from '@/services/api/dashboard/types'
import theme from '@/theme/theme'

interface DashboardFeaturedCardProps {
  content: DashboardFeaturedContent
}

export const DashboardFeaturedCard = ({
  content
}: DashboardFeaturedCardProps) => {
  const isVideo = content.mediaType === 'video'

  // An APOD video is usually a YouTube embed — a web page, not a video file —
  // so <video> renders an empty box. The card shows the thumbnail and sends
  // the viewer to the APOD screen, which knows how to frame it.
  const previewUrl = isVideo ? content.thumbnailUrl : content.mediaUrl

  return (
    <Card>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 1, minHeight: 280, position: 'relative' }}>
          {previewUrl ? (
            <Box
              component="img"
              src={previewUrl}
              alt={content.imageLabel}
              sx={{
                width: '100%',
                height: '100%',
                minHeight: 280,
                objectFit: 'cover',
                display: 'block',
                borderBottom: {
                  xs: `1px solid ${theme.palette.border.mainBorder}`,
                  md: 'none'
                },
                borderRight: {
                  xs: 'none',
                  md: `1px solid ${theme.palette.border.mainBorder}`
                }
              }}
            />
          ) : (
            <ImagePlaceholder
              label={content.imageLabel}
              height="100%"
              borderSide="right"
            />
          )}

          {isVideo && (
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 50% 45%, rgba(10, 10, 42, 0.55), rgba(10, 10, 42, 0.8))',
                pointerEvents: 'none'
              }}
            >
              <PlayCircleOutlineIcon
                sx={{ fontSize: 56, color: theme.palette.secondary.main }}
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
            </Stack>
          )}
        </Box>
        <Box sx={{ flex: 1, p: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ mb: 2 }}
          >
            <Chip
              label={content.badge}
              size="small"
              sx={{
                fontWeight: 700,
                background: theme.palette.secondary.main,
                color: theme.palette.common.black
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {content.date}
            </Typography>
          </Stack>

          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            {content.title}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {content.description}
          </Typography>

          {content.credit && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Credit: {content.credit}
            </Typography>
          )}

          <Button variant="contained" component={Link} href={content.href}>
            {isVideo ? 'Watch Video' : 'View Full Image'}
          </Button>
        </Box>
      </Box>
    </Card>
  )
}
