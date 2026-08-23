'use client'

import { keyframes } from '@emotion/react'
import { Box, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import theme from '@/theme/theme'

const MESSAGE_INTERVAL_MS = 2200

const messages = [
  'Aligning the telescope',
  'Dusting off the lens',
  'Waiting for photons to arrive',
  'Observing distant planets',
  'Negotiating with gravity',
  'Rethinking a few ideas',
  'Calibrating star charts',
  'Counting rocks in the asteroid belt',
  'Asking Mars for directions',
  'Untangling a solar flare',
  'Politely ignoring a black hole',
  'Charting the constellations'
]

const surfaceSpin = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`

const orbit = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`

const twinkle = keyframes`
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.7; }
`

const stars = [
  { top: '12%', left: '18%', delay: '0s' },
  { top: '26%', left: '78%', delay: '0.6s' },
  { top: '68%', left: '10%', delay: '1.2s' },
  { top: '80%', left: '70%', delay: '0.3s' },
  { top: '44%', left: '92%', delay: '0.9s' },
  { top: '8%', left: '52%', delay: '1.5s' }
]

export const SpaceLoader = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setIndex(current => (current + 1) % messages.length),
      MESSAGE_INTERVAL_MS
    )

    return () => clearInterval(timer)
  }, [])

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={5}
      sx={{ minHeight: '70vh', px: 3, textAlign: 'center' }}
      role="status"
      aria-live="polite"
    >
      <Box sx={{ position: 'relative', width: 220, height: 220 }}>
        {stars.map(star => (
          <Box
            key={`${star.top}-${star.left}`}
            sx={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: theme.palette.common.white,
              animation: `${twinkle} 2.4s ease-in-out infinite`,
              animationDelay: star.delay
            }}
          />
        ))}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            animation: `${orbit} 9s linear infinite`
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 4,
              left: '50%',
              width: 12,
              height: 12,
              ml: '-6px',
              borderRadius: '50%',
              background: '#9AA0B5',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.35)'
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 130,
            height: 130,
            transform: 'translate(-50%, -50%)',
            animation: `${bob} 4s ease-in-out infinite`
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: `0 0 42px rgba(0, 194, 194, 0.35),
                          inset -16px -10px 38px rgba(0, 0, 0, 0.75)`
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                width: '200%',
                background: `repeating-linear-gradient(
                  115deg,
                  #1b1b52 0px,
                  #1b1b52 14px,
                  #2b2a72 14px,
                  #2b2a72 24px,
                  #124f6b 24px,
                  #124f6b 34px,
                  #0f7a86 34px,
                  #0f7a86 44px
                )`,
                animation: `${surfaceSpin} 7s linear infinite`
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.35), transparent 48%)'
              }}
            />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 205,
              height: 58,
              transform: 'translate(-50%, -50%) rotate(-18deg)',
              borderRadius: '50%',
              border: '3px solid rgba(0, 194, 194, 0.45)',
              borderTopColor: 'transparent',
              borderBottomColor: 'rgba(0, 194, 194, 0.7)',
              pointerEvents: 'none'
            }}
          />
        </Box>
      </Box>

      <Stack spacing={1} alignItems="center">
        <Typography
          key={index}
          variant="h6"
          sx={{
            fontWeight: 700,
            color: theme.palette.secondary.main,
            animation: `${fadeIn} 0.5s ease`,
            minHeight: 32
          }}
        >
          {messages[index]}…
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fetching live data from NASA
        </Typography>
      </Stack>
    </Stack>
  )
}
