import { Box, Card, Chip, Stack, Typography } from '@mui/material'

import type { RoverInfo } from '@/services/api/marsRover/types'
import theme from '@/theme/theme'

interface RoverInfoCardProps {
  info: RoverInfo
}

export const RoverInfoCard = ({ info }: RoverInfoCardProps) => {
  const fields: { label: string; value: string }[] = [
    { label: 'Launch Date', value: info.launchDate },
    { label: 'Landing Date', value: info.landingDate },
    { label: 'Latest Sol', value: info.latestSol.toLocaleString('en-US') },
    {
      label: 'Latest Imagery',
      value: new Date(info.latestDate).toLocaleDateString('en-US')
    },
    {
      label: 'Images That Sol',
      value: info.totalImages.toLocaleString('en-US')
    }
  ]

  return (
    <Card sx={{ p: 3, mb: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
        <Typography variant="h6">{info.name}</Typography>
        <Chip
          label={info.status === 'active' ? 'Active' : 'Mission Complete'}
          size="small"
          sx={{
            fontWeight: 700,
            background:
              info.status === 'active'
                ? theme.palette.success.main
                : theme.palette.text.secondary,
            color: theme.palette.common.black
          }}
        />
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(5, 1fr)'
          },
          gap: 3
        }}
      >
        {fields.map(field => (
          <Box key={field.label}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {field.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {field.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  )
}
