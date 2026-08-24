import { Box, Container, Divider, Link, Typography } from '@mui/material'
import React from 'react'

import theme from '@/theme/theme'

const apis = [
  { label: 'APOD', href: 'https://api.nasa.gov/#apod' },
  { label: 'EONET', href: 'https://eonet.gsfc.nasa.gov/docs/v3' },
  {
    label: 'Mars Raw Images',
    href: 'https://mars.nasa.gov/msl/multimedia/raw-images/'
  },
  { label: 'Image & Video Library', href: 'https://images.nasa.gov/' },
  { label: 'NeoWs', href: 'https://api.nasa.gov/#NeoWS' },
  { label: 'JPL Horizons', href: 'https://ssd.jpl.nasa.gov/horizons/' }
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/eugeniol2/whispersofio' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/eugenio-dorneles-araujo/'
  }
]

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
              md: '2fr 1fr 1fr'
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
              Whispers of{' '}
              <Box
                component="span"
                sx={{ color: theme.palette.secondary.main }}
              >
                Io
              </Box>
            </Typography>
            <Typography variant="body1">
              {
                "Explore the universe through NASA's comprehensive API collection."
              }
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              © 2026 Whispers of Io. Data provided by NASA Open Data Portal.
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
              {apis.map(api => (
                <li key={api.label}>
                  <Link
                    href={api.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="inherit"
                  >
                    {api.label}
                  </Link>
                </li>
              ))}
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
              {socials.map(social => (
                <li key={social.href}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="inherit"
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
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
