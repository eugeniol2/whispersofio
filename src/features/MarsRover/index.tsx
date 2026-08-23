'use client'

import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography
} from '@mui/material'
import { useMemo, useState } from 'react'

import {
  useRoverInfoQuery,
  useRoverPhotosQuery
} from '@/services/api/marsRover/queries'
import {
  DEFAULT_ROVER,
  getCameraView
} from '@/services/api/marsRover/roverReference'
import type { CameraView, RoverName } from '@/services/api/marsRover/types'

import { MarsPhotoCard } from './components/MarsPhotoCard'
import { RoverControls } from './components/RoverControls'
import { RoverInfoCard } from './components/RoverInfoCard'

export function MarsRover() {
  const [rover, setRover] = useState<RoverName>(DEFAULT_ROVER)
  const [draftSol, setDraftSol] = useState('')
  const [committedSol, setCommittedSol] = useState<number | null>(null)
  const [camera, setCamera] = useState('all')
  const [view, setView] = useState('all')

  const infoQuery = useRoverInfoQuery(rover)
  const latestSol = infoQuery.data?.latestSol ?? null
  const activeSol = committedSol ?? latestSol

  const photosQuery = useRoverPhotosQuery({
    rover,
    sol: activeSol,
    camera,
    view
  })

  // Both filters are built from the cameras this sol actually has, so neither
  // ever offers an option that would come back empty.
  const solCameras = useMemo(
    () => photosQuery.data?.cameras ?? [],
    [photosQuery.data]
  )

  const viewOptions = useMemo(() => {
    const present = new Set(solCameras.map(cam => getCameraView(cam.name)))
    const order: CameraView[] = ['left', 'right', 'sky', 'other']
    return order.filter(option => present.has(option))
  }, [solCameras])

  const cameraOptions = useMemo(
    () =>
      view === 'all'
        ? solCameras
        : solCameras.filter(cam => getCameraView(cam.name) === view),
    [solCameras, view]
  )

  const handleRoverChange = (nextRover: RoverName) => {
    setRover(nextRover)
    setDraftSol('')
    setCommittedSol(null)
    setCamera('all')
    setView('all')
  }

  const handleViewChange = (nextView: string) => {
    setView(nextView)
    setCamera('all')
  }

  const handleSearch = () => {
    const parsed = Number(draftSol)
    setCommittedSol(draftSol !== '' && parsed >= 0 ? parsed : null)
  }

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Stack
        spacing={1}
        alignItems="center"
        textAlign="center"
        sx={{ pt: 4, pb: 4 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Mars Rover Photos
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 640 }}
        >
          Browse raw imagery straight from NASA&apos;s active Mars rovers,
          filtered by mission sol and camera.
        </Typography>
      </Stack>

      <RoverControls
        rover={rover}
        onRoverChange={handleRoverChange}
        sol={draftSol !== '' ? draftSol : (latestSol?.toString() ?? '')}
        onSolChange={setDraftSol}
        maxSol={latestSol ?? undefined}
        solPending={infoQuery.isPending}
        view={view}
        onViewChange={handleViewChange}
        viewOptions={viewOptions}
        camera={camera}
        onCameraChange={setCamera}
        cameraOptions={cameraOptions}
        onSearch={handleSearch}
        loading={photosQuery.isFetching}
      />

      {infoQuery.isError ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          Failed to load rover info.
        </Alert>
      ) : infoQuery.isPending ? (
        <Stack alignItems="center" sx={{ py: 4, mb: 4 }}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <RoverInfoCard info={infoQuery.data} />
      )}

      {photosQuery.isError ? (
        <Alert severity="error">Failed to load rover photos.</Alert>
      ) : photosQuery.isPending ? (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : photosQuery.data.photos.length === 0 ? (
        <Alert severity="info">
          No photos found for this sol and camera combination.
        </Alert>
      ) : (
        <Grid
          container
          spacing={3}
          aria-busy={photosQuery.isFetching}
          sx={{
            transition: 'opacity 0.2s ease',
            opacity: photosQuery.isFetching ? 0.45 : 1,
            pointerEvents: photosQuery.isFetching ? 'none' : 'auto'
          }}
        >
          {photosQuery.data.photos.map(photo => (
            <Grid key={photo.id} item xs={12} sm={6} md={4}>
              <MarsPhotoCard photo={photo} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
