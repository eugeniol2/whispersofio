'use client'

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { Box, Container, Typography, useTheme } from '@mui/material'

import { InfoCard } from './components/common/CustomCard'
import { CustomCard } from './components/common/ImageCard'

export default function Home() {
  const theme = useTheme()

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 8,
        '& > *:not(:last-child)': { mb: 8 }
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 800,
          mx: 'auto',
          mb: 8,
          px: 2
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}
        >
          Explore the Universe with NASA APIs
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          sx={{
            fontWeight: 400,
            lineHeight: 1.6
          }}
        >
          {
            "Access real-time space data, stunning imagery, and scientific discoveries from NASA's comprehensive collection of APIs. "
          }
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          justifyItems: 'center'
        }}
      >
        <InfoCard value="2,847" label="Images Today" />
        <InfoCard value="156" label="Earth Events" />
        <InfoCard value="23" label="Near Asteroids" />
        <InfoCard value="1,234" label="Mars Photos" />
      </Box>
      <CustomCard
        image="https://stsci-opo.org/STScI-01HYGK7PC1NBR9N26JAJ97W1XR.png"
        title="title"
      />
    </Container>
  )
}
