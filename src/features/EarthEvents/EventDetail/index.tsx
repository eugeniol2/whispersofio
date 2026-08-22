'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import LaunchIcon from '@mui/icons-material/Launch'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import {
  Alert,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Link as MuiLink,
  Snackbar,
  Stack,
  Typography
} from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'

import { useEonetEventQuery } from '@/services/api/eonet/queries'
import type { EonetEvent } from '@/services/api/eonet/types'
import { useReverseGeocodeQuery } from '@/services/api/geocoding/queries'
import { useZoomEarthLinkQuery } from '@/services/api/zoomEarth/queries'
import theme from '@/theme/theme'
import { formatGeocodeResult } from '@/utils/formatGeocodeResult'
import { getRepresentativeCoordinates } from '@/utils/getRepresentativeCoordinates'
import { getZoomEarthStormSlug } from '@/utils/getZoomEarthStormSlug'

import { eonetCategoryIcons } from '../components/icons'
import { GeometryTimeline } from './components/GeometryTimeline'

interface EarthEventDetailProps {
  id: string
}

export function EarthEventDetail({ id }: EarthEventDetailProps) {
  const eventQuery = useEonetEventQuery(id)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
  }

  return (
    <Container maxWidth="md" sx={{ pb: 8, pt: 4 }}>
      <MuiLink
        component={Link}
        href="/earth-events"
        underline="hover"
        color="secondary"
        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, mb: 3 }}
      >
        <ArrowBackIcon sx={{ fontSize: 18 }} />
        Back to Earth Events
      </MuiLink>

      {eventQuery.isError ? (
        <Alert severity="error">Failed to load this event.</Alert>
      ) : eventQuery.isPending ? (
        <Stack alignItems="center" sx={{ py: 10 }}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <EventDetailContent event={eventQuery.data} onCopyLink={handleCopyLink} />
      )}

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Link copied to clipboard"
      />
    </Container>
  )
}

interface EventDetailContentProps {
  event: EonetEvent
  onCopyLink: () => void
}

function EventDetailContent({ event, onCopyLink }: EventDetailContentProps) {
  const category = event.categories[0]
  const Icon = eonetCategoryIcons[category.id]
  const latestGeometry = event.geometry[event.geometry.length - 1]
  const [lon, lat] = getRepresentativeCoordinates(latestGeometry)
  const isOpen = event.closed === null

  const geocodeQuery = useReverseGeocodeQuery(lat, lon, !event.description)
  const locationText =
    event.description ??
    (geocodeQuery.data ? formatGeocodeResult(geocodeQuery.data) : null)

  const zoomEarthSlug = getZoomEarthStormSlug(event)
  const zoomEarthQuery = useZoomEarthLinkQuery(zoomEarthSlug)
  const zoomEarthUrl =
    zoomEarthSlug && zoomEarthQuery.data
      ? `https://zoom.earth/storms/${zoomEarthSlug}/`
      : null

  return (
    <Stack spacing={4}>
      <Card sx={{ p: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                background: 'rgba(0, 194, 194, 0.12)',
                color: theme.palette.secondary.main,
                flexShrink: 0
              }}
            >
              <Icon fontSize="large" />
            </Stack>
            <Stack>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {event.title}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                <Chip label={category.title} size="small" variant="outlined" />
                <Chip
                  label={isOpen ? 'Open' : 'Closed'}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    background: isOpen
                      ? theme.palette.success.main
                      : theme.palette.text.secondary,
                    color: theme.palette.common.black
                  }}
                />
              </Stack>
            </Stack>
          </Stack>

          <IconButton onClick={onCopyLink} color="secondary" aria-label="copy link">
            <ContentCopyIcon />
          </IconButton>
        </Stack>

        {locationText && (
          <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
            <LocationOnIcon
              sx={{ fontSize: 18, color: theme.palette.secondary.main }}
            />
            <Typography variant="body1" color="text.secondary">
              {locationText}
            </Typography>
          </Stack>
        )}

        {zoomEarthUrl && (
          <Button
            component="a"
            href={zoomEarthUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
            sx={{ mb: 2 }}
          >
            View Live Tracking on Zoom.Earth
          </Button>
        )}

        <Typography variant="body2" color="text.secondary">
          Last updated{' '}
          {new Date(latestGeometry.date).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}{' '}
          · {lat.toFixed(2)}, {lon.toFixed(2)}
          {latestGeometry.magnitudeValue != null && latestGeometry.magnitudeUnit
            ? ` · ${latestGeometry.magnitudeValue} ${latestGeometry.magnitudeUnit}`
            : ''}
        </Typography>

        {event.closed && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Closed{' '}
            {new Date(event.closed).toLocaleDateString('en-US', {
              dateStyle: 'medium'
            })}
          </Typography>
        )}
      </Card>

      {event.geometry.length > 1 && (
        <Card sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Position History
          </Typography>
          <GeometryTimeline geometry={event.geometry} />
        </Card>
      )}

      <Card sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          External Sources
        </Typography>
        <Stack spacing={1.5}>
          {event.sources.map(source => (
            <MuiLink
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="secondary"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
            >
              {source.id}
              <LaunchIcon sx={{ fontSize: 14 }} />
            </MuiLink>
          ))}
        </Stack>
      </Card>
    </Stack>
  )
}
