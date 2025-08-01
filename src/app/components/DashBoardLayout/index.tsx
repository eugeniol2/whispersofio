'use client'

import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import React from 'react'

import { drawer } from './components/Drawer'
import Footer from './components/Footer'

const drawerWidth = 240

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          background: `radial-gradient(circle at center, ${theme.palette.background.default} 0%, #000013 100%)`
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` }
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, fontWeight: 700 }}
            >
              NASA Explorer
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button color="inherit">API Keys</Button>
              <Button color="inherit">Support</Button>
              <Button color="inherit">Documentation</Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  background: 'linear-gradient(to bottom, #0A0A2A, #121240)'
                }
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  background: 'linear-gradient(to bottom, #0A0A2A, #121240)',
                  borderRight: `1px solid ${theme.palette.border.mainBorder}`
                }
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            marginTop: '64px'
          }}
        >
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Box>
      <Box
        sx={{
          ml: { md: `${drawerWidth}px` }
        }}
      >
        <Footer />
      </Box>
    </>
  )
}
