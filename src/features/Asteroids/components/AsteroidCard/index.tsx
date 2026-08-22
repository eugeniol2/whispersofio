import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SpeedIcon from '@mui/icons-material/Speed'
import StraightenIcon from '@mui/icons-material/Straighten'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Card, CardActionArea, Chip, Stack, Typography } from '@mui/material'

import type { Asteroid } from '@/services/api/asteroids/types'
import theme from '@/theme/theme'
import { formatCompactNumber } from '@/utils/formatCompactNumber'

import { AsteroidApproachDiagram } from '../AsteroidApproachDiagram'

interface AsteroidCardProps {
  asteroid: Asteroid
  onSelect: (asteroid: Asteroid) => void
}

export const AsteroidCard = ({ asteroid, onSelect }: AsteroidCardProps) => {
  const facts = [
    {
      icon: StraightenIcon,
      label: 'Diameter',
      value: `${formatCompactNumber(asteroid.diameterMinM)}–${formatCompactNumber(
        asteroid.diameterMaxM
      )} m`
    },
    {
      icon: SpeedIcon,
      label: 'Velocity',
      value: `${formatCompactNumber(asteroid.velocityKph)} km/h`
    }
  ]

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea
        onClick={() => onSelect(asteroid)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        }}
      >
        <AsteroidApproachDiagram
          missDistanceLunar={asteroid.missDistanceLunar}
          isHazardous={asteroid.isHazardous}
        />

        <Stack spacing={2} sx={{ p: 3, width: '100%' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1}
          >
            <Stack>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {asteroid.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {asteroid.approachDateFull} · {formatCompactNumber(
                  asteroid.missDistanceKm
                )}{' '}
                km
              </Typography>
            </Stack>
            <ChevronRightIcon
              fontSize="small"
              sx={{ color: theme.palette.secondary.main, flexShrink: 0 }}
            />
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
              <Chip
                label="Sentry Object"
                size="small"
                variant="outlined"
                sx={{ borderColor: theme.palette.warning.main }}
              />
            )}
          </Stack>

          <Stack spacing={1}>
            {facts.map(fact => {
              const Icon = fact.icon

              return (
                <Stack
                  key={fact.label}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Icon
                    fontSize="small"
                    sx={{ color: theme.palette.text.secondary }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {fact.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ ml: 'auto', fontWeight: 600 }}
                  >
                    {fact.value}
                  </Typography>
                </Stack>
              )
            })}
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  )
}
