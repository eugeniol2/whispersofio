import {
  CameraAlt as CameraIcon,
  Public as GlobeIcon,
  Satellite as SatelliteIcon
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material'
import React from 'react'

export const RecentActivity = () => {
  const theme = useTheme()

  const activities = [
    {
      id: 1,
      icon: <CameraIcon sx={{ color: theme.palette.secondary.main }} />,
      title: 'New APOD image available',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      icon: <GlobeIcon sx={{ color: theme.palette.secondary.main }} />,
      title: 'Earthquake detected in Pacific Ocean',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      icon: <SatelliteIcon sx={{ color: theme.palette.secondary.main }} />,
      title: 'Perseverance rover sent 47 new images',
      timestamp: '1 day ago'
    }
  ]

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
          {activities.map((activity, index) => (
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
                  {activity.icon}
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
