'use client'

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import React, { useState } from 'react'

import { CustomDrawer } from './components/CustomDrawer'
import Footer from './components/Footer'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
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
        <AppBar position="fixed">
          {!isDrawerOpen && !isMobile && (
            <Box
              sx={{
                position: 'fixed',
                top: 80,
                left: 16,
                zIndex: theme => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(10,10,42,0.8)',
                borderRadius: '50%',
                boxShadow: 3
              }}
            >
              <IconButton
                onClick={handleDrawerToggle}
                color="secondary"
                size="large"
                sx={{
                  boxShadow: '0 4px 15px rgba(0, 194, 194, 0.3)'
                }}
              >
                <KeyboardDoubleArrowRightIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
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

        <CustomDrawer
          drawerToggleFunction={handleDrawerToggle}
          isOpen={isDrawerOpen}
          drawerWidth={240}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100px',
            marginTop: '64px'
          }}
        >
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Box>
      <Box>
        <Footer />
      </Box>
    </>
  )
}
