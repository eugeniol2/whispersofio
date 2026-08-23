'use client'

import CameraAltIcon from '@mui/icons-material/CameraAlt'
import ImageIcon from '@mui/icons-material/Image'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import MenuIcon from '@mui/icons-material/Menu'
import PublicIcon from '@mui/icons-material/Public'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', path: '/', Icon: SpaceDashboardIcon },
  { label: 'APOD', path: '/apod', Icon: ImageIcon },
  { label: 'Earth Events', path: '/earth-events', Icon: PublicIcon },
  { label: 'Mars Rover', path: '/mars-rover', Icon: CameraAltIcon },
  { label: 'Media Library', path: '/media', Icon: LibraryBooksIcon },
  { label: 'Asteroids', path: '/asteroids', Icon: ScatterPlotIcon }
]

const isActivePath = (pathname: string, path: string) =>
  path === '/' ? pathname === '/' : pathname.startsWith(path)

export const HeaderNav = () => {
  const theme = useTheme()
  const isCompact = useMediaQuery(theme.breakpoints.down('lg'))
  const pathname = usePathname()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const closeMenu = () => setAnchorEl(null)

  if (isCompact) {
    return (
      <>
        <IconButton
          color="inherit"
          aria-label="Open navigation"
          onClick={event => setAnchorEl(event.currentTarget)}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {navItems.map(item => (
            <MenuItem
              key={item.path}
              component={Link}
              href={item.path}
              onClick={closeMenu}
              selected={isActivePath(pathname, item.path)}
              sx={{ minWidth: 190, py: 1.25, fontSize: '1rem' }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                <item.Icon fontSize="small" />
              </ListItemIcon>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </>
    )
  }

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        gap: 0.5,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {navItems.map(item => {
        const active = isActivePath(pathname, item.path)

        return (
          <Button
            key={item.path}
            component={Link}
            href={item.path}
            color="inherit"
            aria-current={active ? 'page' : undefined}
            startIcon={<item.Icon />}
            sx={{
              px: 1.5,
              fontSize: '1rem',
              whiteSpace: 'nowrap',
              '& .MuiButton-startIcon': { mr: 0.75 },
              fontWeight: active ? 700 : 500,
              color: active
                ? theme.palette.secondary.main
                : theme.palette.common.white,
              borderRadius: 0,
              boxShadow: 'none',
              borderBottom: '2px solid',
              borderColor: active
                ? theme.palette.secondary.main
                : 'transparent',
              '&:hover': {
                transform: 'none',
                boxShadow: 'none',
                background: 'rgba(0, 194, 194, 0.08)',
                borderColor: active
                  ? theme.palette.secondary.main
                  : 'rgba(0, 194, 194, 0.4)'
              }
            }}
          >
            {item.label}
          </Button>
        )
      })}
    </Box>
  )
}
