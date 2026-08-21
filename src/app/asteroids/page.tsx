'use client'

import { Container, Stack, Typography } from '@mui/material'

export default function Asteroids() {
  return (
    <Container maxWidth="md">
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Typography variant="h4" align="center">
          Asteroids
        </Typography>

        <Typography variant="body1" align="center">
          Get started by editing <code>src/app/asteroids/page.tsx</code>
        </Typography>
      </Stack>
    </Container>
  )
}
