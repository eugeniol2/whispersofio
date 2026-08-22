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

import type { RoverCamera, RoverName } from '@/services/api/marsRover/types'

const ROVERS: { value: RoverName; label: string }[] = [
  { value: 'curiosity', label: 'Curiosity' },
  { value: 'opportunity', label: 'Opportunity' },
  { value: 'spirit', label: 'Spirit' },
  { value: 'perseverance', label: 'Perseverance' }
]

interface RoverControlsProps {
  rover: RoverName
  onRoverChange: (rover: RoverName) => void
  sol: number
  onSolChange: (sol: number) => void
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
          onChange={event => onSolChange(Number(event.target.value))}
          sx={{ width: { sm: 120 } }}
        />
        <TextField
          select
          label="Camera"
          size="small"
          value={camera}
          onChange={event => onCameraChange(event.target.value)}
          sx={{ width: { sm: 220 } }}
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
        disabled={loading}
      >
        Get Photos
      </Button>
    </Stack>
  </Card>
)
