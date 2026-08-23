import { Card, Container, Grid, Skeleton, Stack } from '@mui/material'

interface PageSkeletonProps {
  cards?: number
  featured?: boolean
  stats?: number
}

export const PageSkeleton = ({
  cards = 6,
  featured = false,
  stats = 0
}: PageSkeletonProps) => (
  <Container maxWidth="lg" sx={{ pb: 8 }}>
    <Stack spacing={1} alignItems="center" sx={{ pt: 4, pb: 4 }}>
      <Skeleton variant="text" width={340} height={56} />
      <Skeleton variant="text" width={520} />
    </Stack>

    <Card sx={{ p: 3, mb: 4 }}>
      <Skeleton variant="rounded" height={40} />
    </Card>

    {stats > 0 && (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Array.from({ length: stats }).map((_, index) => (
          <Grid key={index} item xs={6} md={12 / stats}>
            <Card sx={{ p: 3 }}>
              <Skeleton variant="text" width="55%" height={38} />
              <Skeleton variant="text" width="75%" />
            </Card>
          </Grid>
        ))}
      </Grid>
    )}

    {featured && (
      <Card sx={{ mb: 5 }}>
        <Skeleton variant="rectangular" height={400} />
        <Stack spacing={1} sx={{ p: 3 }}>
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="60%" height={36} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="80%" />
        </Stack>
      </Card>
    )}

    <Grid container spacing={3}>
      {Array.from({ length: cards }).map((_, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <Stack spacing={1} sx={{ p: 2 }}>
              <Skeleton variant="text" width="45%" />
              <Skeleton variant="text" width="70%" height={28} />
              <Skeleton variant="text" width="60%" />
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
)
