import {
  alpha,
  Box,
  Button,
  Card,
  Chip,
  Stack,
  Typography,
  useTheme
} from '@mui/material'
import { type StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'

interface CardProps {
  image: string | StaticImport
  title: string
}

export const CustomCard = ({ image, title }: CardProps) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: '32px',
        transition: 'none',
        '&:hover': {
          transform: 'none',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      <Box
        position="relative"
        width={{ xs: '139px', md: '319px', lg: '500px' }}
        sx={{
          borderRadius: {
            xs: '0',
            md: '20px 0 0 20px',
            lg: '20px 0 0 20px'
          }
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          quality={100}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: 'inherit'
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
            Featured Content
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label="APOD"
            size="small"
            sx={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText
            }}
          />
          <Typography variant="body2" color="text.secondary">
            January 15, 2025
          </Typography>
        </Stack>

        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          The Orion Nebula in Infrared
        </Typography>

        <Typography component="p" variant="body1" sx={{ mb: 3 }}>
          A stunning infrared view of the Orion Nebula captured by the James
          Webb Space Telescope, revealing hidden stellar nurseries and cosmic
          dust formations.
        </Typography>

        <Button
          component="a"
          variant="outlined"
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            transition: 'background-color 0.4s ease, color 0.4s ease',
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText
            }
          }}
        >
          View Full Image
        </Button>
      </Box>
    </Card>
  )
}
