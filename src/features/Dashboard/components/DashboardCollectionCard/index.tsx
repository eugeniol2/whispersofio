import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Card, CardActionArea, Stack, Typography } from '@mui/material'
import Link from 'next/link'

import type { DashboardApiCollection } from '@/services/api/dashboard/types'
import theme from '@/theme/theme'

import { dashboardIcons } from '../icons'

interface DashboardCollectionCardProps {
  collection: DashboardApiCollection
}

export const DashboardCollectionCard = ({
  collection
}: DashboardCollectionCardProps) => {
  const Icon = dashboardIcons[collection.icon]

  const content = (
    <Stack spacing={1.5} sx={{ p: 3, height: '100%' }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          background: 'rgba(0, 194, 194, 0.12)',
          color: theme.palette.secondary.main
        }}
      >
        <Icon fontSize="small" />
      </Stack>
      <Typography variant="h6">{collection.title}</Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ flexGrow: 1 }}
      >
        {collection.description}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="caption" color="text.secondary">
          {collection.caption}
        </Typography>
        <ArrowForwardIcon
          fontSize="small"
          sx={{ color: theme.palette.secondary.main }}
        />
      </Stack>
    </Stack>
  )

  if (!collection.href) {
    return <Card sx={{ opacity: 0.6 }}>{content}</Card>
  }

  return (
    <Card>
      <CardActionArea
        component={Link}
        href={collection.href}
        sx={{ height: '100%' }}
      >
        {content}
      </CardActionArea>
    </Card>
  )
}
