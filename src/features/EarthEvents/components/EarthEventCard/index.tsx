import LaunchIcon from '@mui/icons-material/Launch'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Card, Chip, Link as MuiLink, Stack, Typography } from '@mui/material'

import type { EonetEvent, EonetGeometry } from '@/services/api/eonet/types'
import { useReverseGeocodeQuery } from '@/services/api/geocoding/queries'
import theme from '@/theme/theme'
import { formatGeocodeResult } from '@/utils/formatGeocodeResult'

import { eonetCategoryIcons } from '../icons'

interface EarthEventCardProps {
  event: EonetEvent
}

// Point coordinates are a flat [lon, lat] pair. Polygon coordinates are
// GeoJSON-style rings of [lon, lat] pairs — use the first vertex as a
// representative point for display.
const getRepresentativeCoordinates = (
  geometry: EonetGeometry
): [number, number] => {
  if (geometry.type === 'Point') {
    const [lon, lat] = geometry.coordinates as number[]
    return [lon, lat]
  }

  const [lon, lat] = (geometry.coordinates as number[][][])[0][0]
  return [lon, lat]
}

export const EarthEventCard = ({ event }: EarthEventCardProps) => {
  const category = event.categories[0]
  const Icon = eonetCategoryIcons[category.id]
  const latestGeometry = event.geometry[event.geometry.length - 1]
  const [lon, lat] = getRepresentativeCoordinates(latestGeometry)
  const isOpen = event.closed === null

  // EONET's own description sometimes already has a readable location
  // (e.g. "9 Miles N from Reed Point, MT") — only reverse-geocode when
  // it doesn't, since that's the common case and saves a lookup.
  const geocodeQuery = useReverseGeocodeQuery(lat, lon, !event.description)
  const locationText =
    event.description ??
    (geocodeQuery.data ? formatGeocodeResult(geocodeQuery.data) : null)

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              background: 'rgba(0, 194, 194, 0.12)',
              color: theme.palette.secondary.main,
              flexShrink: 0
            }}
          >
            <Icon />
          </Stack>
          <Stack>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {event.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(latestGeometry.date).toLocaleDateString()} ·{' '}
              {lat.toFixed(1)}, {lon.toFixed(1)}
            </Typography>
            {locationText && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}
              >
                <LocationOnIcon
                  sx={{ fontSize: 16, color: theme.palette.secondary.main }}
                />
                {locationText}
              </Typography>
            )}
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
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

      <MuiLink
        href={event.sources[0]?.url ?? event.link}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        color="secondary"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          mt: 2
        }}
      >
        View Source
        <LaunchIcon sx={{ fontSize: 14 }} />
      </MuiLink>
    </Card>
  )
}
