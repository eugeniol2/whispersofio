import CameraIcon from '@mui/icons-material/Camera'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ImageIcon from '@mui/icons-material/Image'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import LanguageIcon from '@mui/icons-material/Language'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import PublicIcon from '@mui/icons-material/Public'
import {
  Box,
  Button,
  Drawer,
  IconButton,
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

interface CustomDrawerProps {
  drawerToggleFunction: () => void
  isOpen: boolean
  drawerWidth: string | number
}

export const CustomDrawer = ({
  drawerToggleFunction,
  isOpen,
  drawerWidth
}: CustomDrawerProps) => (
  <Drawer
    variant="temporary"
    transitionDuration={500}
    sx={{
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        background: 'linear-gradient(to bottom, #0A0A2A, #121240)',
        borderRight: `1px solid ${theme.palette.border.mainBorder}`
      }
    }}
    open={isOpen}
    onClose={drawerToggleFunction}
    ModalProps={{
      keepMounted: true
    }}
  >
    <Box flex={1} mt={1.5} mr={2} display="flex" flexDirection="column">
      <Box alignSelf="flex-end">
        <IconButton
          color="secondary"
          aria-label="open drawer"
          edge="start"
          onClick={drawerToggleFunction}
        >
          <KeyboardDoubleArrowLeftIcon fontSize="large" />
        </IconButton>
      </Box>
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
    </Box>
  </Drawer>
)
