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
}: DashboardFeaturedCardProps) => (
  <Card>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ flex: 1, minHeight: 280 }}>
        <ImagePlaceholder
          label={content.imageLabel}
          height="100%"
          borderSide="right"
        />
      </Box>
      <Box sx={{ flex: 1, p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
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

        <Button variant="contained" component={Link} href={content.href}>
          View Full Image
        </Button>
      </Box>
    </Box>
  </Card>
)
