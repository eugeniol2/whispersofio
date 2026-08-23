'use client'

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material'
import Link from 'next/link'
import React from 'react'

import Footer from '@/components/Footer'
import { HeaderNav } from '@/components/HeaderNav'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const theme = useTheme()

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: `radial-gradient(circle at center, ${theme.palette.background.default} 0%, #000013 100%)`
        }}
      >
        <AppBar position="fixed">
          <Toolbar sx={{ position: 'relative', gap: 2 }}>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                href="/"
                sx={{
                  display: 'inline-block',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                NASA Explorer
              </Typography>
            </Box>
            <HeaderNav />
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            p: 3,
            mt: '64px'
          }}
        >
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Box>
      <Footer />
    </>
  )
}
