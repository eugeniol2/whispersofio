'use client'

import CloseIcon from '@mui/icons-material/Close'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PublicIcon from '@mui/icons-material/Public'
import VisibilityIcon from '@mui/icons-material/Visibility'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
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

import { useAsteroidVisibilityQuery } from '@/services/api/asteroids/queries'
import type { Asteroid } from '@/services/api/asteroids/types'
import {
  describeVisibleRegions,
  formatDeclination,
  getVisibilityTier
} from '@/services/api/asteroids/visibility'
import theme from '@/theme/theme'
import { formatCompactNumber } from '@/utils/formatCompactNumber'

interface AsteroidDetailDialogProps {
  asteroid: Asteroid | null
  onClose: () => void
}

export const AsteroidDetailDialog = ({
  asteroid,
  onClose
}: AsteroidDetailDialogProps) => {
  const visibilityQuery = useAsteroidVisibilityQuery(
    asteroid?.id ?? null,
    asteroid?.approachDate ?? null
  )

  if (!asteroid) return null

  const visibility = visibilityQuery.data
  const magnitude = visibility?.magnitude ?? null
  const tier = magnitude !== null ? getVisibilityTier(magnitude) : null
  const regions =
    visibility?.declination != null
      ? describeVisibleRegions(visibility.declination)
      : null

  const facts = [
    {
      label: 'Diameter',
      value: `${formatCompactNumber(asteroid.diameterMinM)}–${formatCompactNumber(asteroid.diameterMaxM)} m`
    },
    {
      label: 'Velocity',
      value: `${formatCompactNumber(asteroid.velocityKph)} km/h`
    },
    {
      label: 'Miss Distance',
      value: `${formatCompactNumber(asteroid.missDistanceLunar, 1)} LD`
    },
    { label: 'Closest Approach', value: asteroid.approachDateFull }
  ]

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth scroll="body">
      <DialogContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {asteroid.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Orbits {asteroid.orbitingBody}
              </Typography>
            </Stack>
            <IconButton onClick={onClose} aria-label="Close" size="small">
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {asteroid.isHazardous ? (
              <Chip
                icon={<WarningAmberIcon />}
                label="Potentially Hazardous"
                size="small"
                sx={{
                  fontWeight: 700,
                  background: theme.palette.warning.main,
                  color: theme.palette.common.black,
                  '& .MuiChip-icon': { color: theme.palette.common.black }
                }}
              />
            ) : (
              <Chip label="Not Hazardous" size="small" variant="outlined" />
            )}
            {asteroid.isSentry && (
              <Chip label="Sentry Object" size="small" variant="outlined" />
            )}
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2
            }}
          >
            {facts.map(fact => (
              <Box key={fact.label}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {fact.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {fact.label}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ borderColor: theme.palette.border.mainBorder }} />

          <Stack spacing={1.5}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <VisibilityIcon
                fontSize="small"
                sx={{ color: theme.palette.secondary.main }}
              />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Can you see it?
              </Typography>
            </Stack>

            {visibilityQuery.isPending ? (
              <Stack alignItems="center" sx={{ py: 3 }}>
                <CircularProgress size={28} color="secondary" />
              </Stack>
            ) : visibilityQuery.isError ? (
              <Alert severity="warning">
                Could not reach JPL Horizons for the observing data.
              </Alert>
            ) : magnitude === null || !tier ? (
              <Alert severity="info">
                JPL Horizons has no brightness prediction for this object.
              </Alert>
            ) : (
              <Stack spacing={2}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(0, 194, 194, 0.08)',
                    border: `1px solid ${theme.palette.border.mainBorder}`
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: theme.palette.secondary.main }}
                  >
                    {tier.equipment}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tier.detail}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 1 }}
                  >
                    Peak brightness: magnitude {magnitude.toFixed(1)} · lower is
                    brighter, the naked-eye limit is about 6
                  </Typography>
                </Box>

                {regions && visibility?.declination != null && (
                  <Stack spacing={0.5}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <PublicIcon
                        fontSize="small"
                        sx={{ color: theme.palette.secondary.main }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {regions.summary}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {regions.regions}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {regions.limit}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Sits directly overhead at{' '}
                      {formatDeclination(visibility.declination)} · RA{' '}
                      {visibility.rightAscension}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            )}
          </Stack>

          <Button
            variant="outlined"
            color="secondary"
            endIcon={<OpenInNewIcon />}
            href={asteroid.jplUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in JPL Small-Body Database
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
