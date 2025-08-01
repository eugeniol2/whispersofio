'use client'

import { Box, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'

export default function Home() {
  return (
    <Container maxWidth="md">
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <Typography variant="h6" align="center">
          Get started by editing <code>src/app/page.tsx</code>
        </Typography>

        <Typography variant="body1" align="center">
          Save and see your changes instantly.
        </Typography>

        <Box component="footer" sx={{ mt: 6 }}>
          <Typography variant="caption" color="text.secondary">
            Powered by Next.js & Material UI
          </Typography>
        </Box>
      </Stack>
    </Container>
  )
}
