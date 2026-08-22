'use client'

import { Container, Stack, Typography } from '@mui/material'

export function EarthEvents() {
  return (
    <Container maxWidth="md">
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Typography variant="h4" align="center">
          Earth Events
        </Typography>

        <Typography variant="body1" align="center">
          Get started by editing <code>src/features/EarthEvents/index.tsx</code>
        </Typography>
      </Stack>
    </Container>
  )
}
