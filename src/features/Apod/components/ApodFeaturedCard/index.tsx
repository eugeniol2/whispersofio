'use client'

import CheckIcon from '@mui/icons-material/Check'
import HighQualityIcon from '@mui/icons-material/HighQuality'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import ShareIcon from '@mui/icons-material/Share'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import { useState } from 'react'

import type { ApodEntry } from '@/services/api/apod/types'
import theme from '@/theme/theme'
import { getApodPageUrl } from '@/utils/getApodPageUrl'

import { ApodMedia } from '../ApodMedia'

interface ApodFeaturedCardProps {
  entry: ApodEntry
}

export const ApodFeaturedCard = ({ entry }: ApodFeaturedCardProps) => {
  const [copied, setCopied] = useState(false)
  const pageUrl = getApodPageUrl(entry.date)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Card>
      <ApodMedia entry={entry} height={400} interactive />
      <CardContent sx={{ p: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Chip
              label="APOD"
              size="small"
              sx={{
                fontWeight: 700,
                background: theme.palette.secondary.main,
                color: theme.palette.common.black
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {entry.date}
            </Typography>
            {entry.mediaType === 'video' && (
              <Chip label="Video" size="small" variant="outlined" />
            )}
          </Stack>
          <Stack direction="row" spacing={1}>
            {entry.hdUrl && entry.hdUrl !== entry.url && (
              <Tooltip title="Open full resolution">
                <IconButton
                  size="small"
                  aria-label="Open full resolution"
                  color="secondary"
                  href={entry.hdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HighQualityIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={copied ? 'Link copied' : 'Copy link'}>
              <IconButton
                size="small"
                aria-label="Copy link"
                color="secondary"
                onClick={handleShare}
              >
                {copied ? (
                  <CheckIcon fontSize="small" />
                ) : (
                  <ShareIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Open on apod.nasa.gov">
              <IconButton
                size="small"
                aria-label="Open on NASA"
                color="secondary"
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Typography variant="h5" sx={{ mt: 2, mb: 2, fontWeight: 700 }}>
          {entry.title}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {entry.description}
        </Typography>

        {entry.credit && (
          <>
            <Divider
              sx={{ my: 3, borderColor: theme.palette.border.mainBorder }}
            />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Credit: {entry.credit}
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}
