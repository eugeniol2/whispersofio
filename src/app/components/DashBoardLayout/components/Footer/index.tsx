// src/components/Footer.tsx
import { Box, Container, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'

import theme from '@/app/theme/theme'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        px: 2,
        backgroundColor: theme.palette.background.default,
        borderTop: `1px solid ${theme.palette.border.mainBorder}`,
        backdropFilter: 'blur(10px)',
        color: '#E0E0E0'
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '2fr 1fr 1fr 1fr'
            },
            gap: 4
          }}
        >
          <Box
            sx={{
              gridColumn: { xs: '1', md: '1' },
              maxWidth: { md: '600px' }
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 700, color: theme.palette.common.white }}
            >
              NASA Explorer
            </Typography>
            <Typography variant="body1">
              {
                "Explore the universe through NASA's comprehensive API collection."
              }
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              © 2025 NASA Explorer. Data provided by NASA Open Data Portal.
            </Typography>
          </Box>

          <Box sx={{ justifySelf: { md: 'start' } }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: theme.palette.secondary.main }}
            >
              APIs
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 2 }}>
              <li>
                <Link href="#" underline="hover" color="inherit">
                  APOD
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover" color="inherit">
                  Earth Events
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover" color="inherit">
                  Mars Rover
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover" color="inherit">
                  Asteroids
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover" color="inherit">
                  Space Weather
                </Link>
              </li>
            </Box>
          </Box>

          <Box sx={{ justifySelf: { md: 'start' } }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: theme.palette.secondary.main }}
            >
              Resources
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 2 }}>
              <li>
                <Link href="#" underline="hover" color="inherit">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover" color="inherit">
                  API Keys
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover" color="inherit">
                  Support
                </Link>
              </li>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, color: theme.palette.secondary.main }}
            >
              Connect
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 2 }}>
              <li>
                <Link href="#" underline="hover" color="inherit">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="#" underline="hover" color="inherit">
                  Twitter
                </Link>
              </li>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 4, borderColor: theme.palette.border.mainBorder }} />
        <Typography variant="body2" align="center">
          {
            "This site is not affiliated with NASA. It's a fan-made project for educational purposes."
          }
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
