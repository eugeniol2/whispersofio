import { Divider, Stack, Typography } from '@mui/material'

import type { EonetGeometry } from '@/services/api/eonet/types'
import theme from '@/theme/theme'
import { getRepresentativeCoordinates } from '@/utils/getRepresentativeCoordinates'

interface GeometryTimelineProps {
  geometry: EonetGeometry[]
}

export const GeometryTimeline = ({ geometry }: GeometryTimelineProps) => {
  const points = [...geometry].reverse()

  return (
    <Stack>
      {points.map((point, index) => {
        const [lon, lat] = getRepresentativeCoordinates(point)

        return (
          <Stack key={`${point.date}-${index}`}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ py: 1.5 }}
            >
              <Typography variant="body2">
                {new Date(point.date).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {lat.toFixed(2)}, {lon.toFixed(2)}
                {point.magnitudeValue != null && point.magnitudeUnit
                  ? ` · ${point.magnitudeValue} ${point.magnitudeUnit}`
                  : ''}
              </Typography>
            </Stack>
            {index < points.length - 1 && (
              <Divider sx={{ borderColor: theme.palette.border.mainBorder }} />
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}
