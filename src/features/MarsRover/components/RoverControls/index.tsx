'use client'

import SearchIcon from '@mui/icons-material/Search'
import {
  Button,
  Card,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField
} from '@mui/material'

import { cameraViewLabels } from '@/services/api/marsRover/roverReference'
import type {
  CameraView,
  RoverCamera,
  RoverName
} from '@/services/api/marsRover/types'

const ROVERS: { value: RoverName; label: string }[] = [
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'perseverance', label: 'Perseverance' }
]

interface RoverControlsProps {
  rover: RoverName
  onRoverChange: (rover: RoverName) => void
  sol: string
  onSolChange: (sol: string) => void
  maxSol?: number
  solPending?: boolean
  view: string
  onViewChange: (view: string) => void
  viewOptions: CameraView[]
  camera: string
  onCameraChange: (camera: string) => void
  cameraOptions: RoverCamera[]
  onSearch: () => void
  loading?: boolean
}

export const RoverControls = ({
  rover,
  onRoverChange,
  sol,
  onSolChange,
  maxSol,
  solPending = false,
  view,
  onViewChange,
  viewOptions,
  camera,
  onCameraChange,
  cameraOptions,
  onSearch,
  loading = false
}: RoverControlsProps) => (
  <Card sx={{ mb: 4 }}>
    <Tabs
      value={rover}
      onChange={(_, value) => onRoverChange(value)}
      variant="scrollable"
      scrollButtons="auto"
      textColor="secondary"
      indicatorColor="secondary"
      sx={{ px: 2, pt: 1 }}
    >
      {ROVERS.map(item => (
        <Tab key={item.value} value={item.value} label={item.label} />
      ))}
    </Tabs>

    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      justifyContent="space-between"
      spacing={2}
      sx={{ p: 3 }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Sol"
          type="number"
          size="small"
          value={sol}
          onChange={event => onSolChange(event.target.value)}
          disabled={solPending}
          helperText={
            solPending
              ? 'Finding latest sol…'
              : maxSol
                ? `Latest: ${maxSol.toLocaleString('en-US')}`
                : ' '
          }
          slotProps={{ htmlInput: { min: 0, max: maxSol } }}
          sx={{ width: { sm: 140 } }}
        />
        <TextField
          select
          label="View"
          size="small"
          value={view}
          onChange={event => onViewChange(event.target.value)}
          helperText=" "
          sx={{ width: { sm: 150 } }}
        >
          <MenuItem value="all">All Views</MenuItem>
          {viewOptions.map(option => (
            <MenuItem key={option} value={option}>
              {cameraViewLabels[option]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Camera"
          size="small"
          value={camera}
          onChange={event => onCameraChange(event.target.value)}
          helperText=" "
          sx={{ width: { sm: 250 } }}
        >
          <MenuItem value="all">All Cameras</MenuItem>
          {cameraOptions.map(cam => (
            <MenuItem key={cam.name} value={cam.name}>
              {cam.fullName}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={onSearch}
        loading={loading || solPending}
        loadingPosition="start"
      >
        {loading ? 'Loading' : 'Get Photos'}
      </Button>
    </Stack>
  </Card>
)
