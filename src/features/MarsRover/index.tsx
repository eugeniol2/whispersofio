'use client'

import { Alert, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { roverCameras } from '@/services/api/marsRover/mockData'
import {
  useRoverInfoQuery,
  useRoverPhotosQuery
} from '@/services/api/marsRover/queries'
import type { RoverName } from '@/services/api/marsRover/types'

import { MarsPhotoCard } from './components/MarsPhotoCard'
import { RoverControls } from './components/RoverControls'
import { RoverInfoCard } from './components/RoverInfoCard'

const DEFAULT_SOL = 1000

export function MarsRover() {
  const [rover, setRover] = useState<RoverName>('curiosity')
  const [draftSol, setDraftSol] = useState(DEFAULT_SOL)
  const [draftCamera, setDraftCamera] = useState('all')
  const [committedSol, setCommittedSol] = useState(DEFAULT_SOL)
  const [committedCamera, setCommittedCamera] = useState('all')

  const infoQuery = useRoverInfoQuery(rover)
  const photosQuery = useRoverPhotosQuery({
    rover,
    sol: committedSol,
    camera: committedCamera
  })

  const handleRoverChange = (nextRover: RoverName) => {
    setRover(nextRover)
    setDraftCamera('all')
    setCommittedCamera('all')
  }

  const handleSearch = () => {
    setCommittedSol(draftSol)
    setCommittedCamera(draftCamera)
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
          Browse raw imagery from NASA&apos;s Mars rovers, filtered by
          mission sol and camera.
        </Typography>
      </Stack>

      <RoverControls
        rover={rover}
        onRoverChange={handleRoverChange}
        sol={draftSol}
        onSolChange={setDraftSol}
        camera={draftCamera}
        onCameraChange={setDraftCamera}
        cameraOptions={roverCameras[rover]}
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
      ) : photosQuery.data.length === 0 ? (
        <Alert severity="info">
          No photos found for this sol/camera combination.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {photosQuery.data.map(photo => (
            <Grid key={photo.id} item xs={12} sm={6} md={4}>
              <MarsPhotoCard photo={photo} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
