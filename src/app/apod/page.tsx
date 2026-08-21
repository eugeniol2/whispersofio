'use client'

import { Container, Stack, Typography } from '@mui/material'

export default function Apod() {
  return (
    <Container maxWidth="md">
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Typography variant="h4" align="center">
          APOD
        </Typography>

        <Typography variant="body1" align="center">
          Get started by editing <code>src/app/apod/page.tsx</code>
        </Typography>
      </Stack>
    </Container>
  )
}
