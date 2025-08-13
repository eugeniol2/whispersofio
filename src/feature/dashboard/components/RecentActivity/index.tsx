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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            Recent Activity
          </Typography>
          <Button
            variant="text"
            size="small"
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.875rem',
              color: theme.palette.secondary.main,
              '&:hover': {
                color: theme.palette.secondary.light
              }
            }}
          >
            View All
          </Button>
        </Box>

        <List sx={{ p: 0 }}>
          {activities.map((activity, index) => (
            <ListItem
              key={activity.id}
              sx={{
                px: 0,
                py: 1.5,
                ...(index < activities.length - 1 && { mb: 1 }),
                borderBottom:
                  index < activities.length - 1
                    ? `1px solid ${theme.palette.border.mainBorder}`
                    : 'none'
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: theme.palette.background.default,
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
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary',
                      lineHeight: 1.4
                    }}
                  >
                    {activity.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      mt: 0.5,
                      display: 'block'
                    }}
                  >
                    {activity.timestamp}
                  </Typography>
                }
                sx={{ ml: 1.5 }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
