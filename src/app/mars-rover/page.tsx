'use client'

import { Container, Stack, Typography } from '@mui/material'

export default function MarsRover() {
  return (
    <Container maxWidth="md">
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Typography variant="h4" align="center">
          Mars Rover
        </Typography>

        <Typography variant="body1" align="center">
          Get started by editing <code>src/app/mars-rover/page.tsx</code>
        </Typography>
      </Stack>
    </Container>
  )
}
