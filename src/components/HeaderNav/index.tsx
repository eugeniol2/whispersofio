'use client'

import MenuIcon from '@mui/icons-material/Menu'
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'APOD', path: '/apod' },
  { label: 'Earth Events', path: '/earth-events' },
  { label: 'Mars Rover', path: '/mars-rover' },
  { label: 'Media Library', path: '/media' },
  { label: 'Asteroids', path: '/asteroids' }
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
      // Absolutely centred on the toolbar so the brand's width doesn't pull the
      // links off-centre. The toolbar is the positioning context.
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
            // The global MuiButton style is built for CTAs: it adds a glow and
            // lifts on hover, which reads wrong for a row of nav links.
            sx={{
              px: 1.75,
              fontSize: '1rem',
              fontWeight: active ? 700 : 500,
              color: active
                ? theme.palette.secondary.main
                : theme.palette.common.white,
              borderRadius: 0,
              boxShadow: 'none',
              borderBottom: '2px solid',
              borderColor: active ? theme.palette.secondary.main : 'transparent',
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
