import CameraIcon from '@mui/icons-material/Camera'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ImageIcon from '@mui/icons-material/Image'
import LanguageIcon from '@mui/icons-material/Language'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import PublicIcon from '@mui/icons-material/Public'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material'

import theme from '@/app/theme/theme'

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'APOD', icon: <ImageIcon />, path: '/apod' },
  { text: 'Earth Events', icon: <PublicIcon />, path: '/earth-events' },
  { text: 'Mars Rover', icon: <CameraIcon />, path: '/mars-rover' },
  { text: 'Media Library', icon: <LibraryBooksIcon />, path: '/media' },
  { text: 'Asteroids', icon: <LanguageIcon />, path: '/asteroids' }
]

export const drawer = (
  <Box
    sx={{
      height: '100%',
      background: theme.palette.background.backgroundGradient,
      color: theme.palette.common.white,
      paddingTop: '64px'
    }}
  >
    <Toolbar />
    <List>
      {navItems.map(item => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            sx={{
              py: 2
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.secondary.main }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        py: 2,
        background: theme.palette.background.customBackground
      }}
    >
      <Button
        variant="contained"
        sx={{
          borderRadius: '50px',
          fontWeight: 600,
          px: 4
        }}
      >
        Upgrade
      </Button>
    </Box>
  </Box>
)
