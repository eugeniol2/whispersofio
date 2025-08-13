import {
  Avatar,
  Card,
  CardContent,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material'
import React from 'react'

import { getActivityIcon } from '@/app/utils/getActivityIcon '

export interface Activity {
  id: number | string
  type: string
  title: string
  timestamp: string
}

interface RecentActivityProps {
  activities: Activity[]
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        width: '100%',
        mx: 'auto',
        borderRadius: 2,
        border: `1px solid ${theme.palette.border.mainBorder}`,
        background: theme.palette.background.paper,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <List sx={{ py: 1 }}>
          {activities.map(activity => (
            <ListItemButton key={activity.id} sx={{ py: 1.5 }}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: 'background.default',
                    border: `1px solid ${theme.palette.border.mainBorder}`
                  }}
                >
                  {getActivityIcon(activity.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, lineHeight: 1.4 }}
                  >
                    {activity.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="caption"
                    sx={{ mt: 0.5, display: 'block' }}
                  >
                    {activity.timestamp}
                  </Typography>
                }
                sx={{ ml: 1.5 }}
              />
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
