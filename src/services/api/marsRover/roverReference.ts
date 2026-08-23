import type { CameraView, RoverCamera, RoverName } from './types'

export const cameraViewLabels: Record<CameraView, string> = {
  left: 'Left',
  right: 'Right',
  sky: 'Sky',
  other: 'Other'
}

export function getCameraView(instrument: string): CameraView {
  if (/(^|_)SKYCAM(_|$)/.test(instrument)) return 'sky'
  if (/(^|_)LEFT(_|$)/.test(instrument)) return 'left'
  if (/(^|_)RIGHT(_|$)/.test(instrument)) return 'right'
  return 'other'
}

export const DEFAULT_ROVER: RoverName = 'curiosity'

export const roverFeedCategory: Record<RoverName, string> = {
  curiosity: 'msl',
  perseverance: 'mars2020'
}

interface RoverMissionFacts {
  name: string
  status: 'active' | 'complete'
  launchDate: string
  landingDate: string
}

export const roverMissionFacts: Record<RoverName, RoverMissionFacts> = {
  curiosity: {
    name: 'Curiosity',
    status: 'active',
    launchDate: '2011-11-26',
    landingDate: '2012-08-06'
  },
  perseverance: {
    name: 'Perseverance',
    status: 'active',
    launchDate: '2020-07-30',
    landingDate: '2021-02-18'
  }
}

export const roverCameras: Record<RoverName, RoverCamera[]> = {
  curiosity: [
    { name: 'MAST_LEFT', fullName: 'Mast Camera - Left' },
    { name: 'MAST_RIGHT', fullName: 'Mast Camera - Right' },
    { name: 'CHEMCAM_RMI', fullName: 'Chemistry Camera - Remote Micro-Imager' },
    { name: 'MAHLI', fullName: 'Mars Hand Lens Imager' },
    { name: 'MARDI', fullName: 'Mars Descent Imager' },
    { name: 'NAV_LEFT_A', fullName: 'Navigation Camera - Left A' },
    { name: 'NAV_LEFT_B', fullName: 'Navigation Camera - Left B' },
    { name: 'NAV_RIGHT_A', fullName: 'Navigation Camera - Right A' },
    { name: 'NAV_RIGHT_B', fullName: 'Navigation Camera - Right B' },
    { name: 'FHAZ_LEFT_A', fullName: 'Front Hazard Avoidance - Left A' },
    { name: 'FHAZ_LEFT_B', fullName: 'Front Hazard Avoidance - Left B' },
    { name: 'FHAZ_RIGHT_A', fullName: 'Front Hazard Avoidance - Right A' },
    { name: 'FHAZ_RIGHT_B', fullName: 'Front Hazard Avoidance - Right B' },
    { name: 'RHAZ_LEFT_A', fullName: 'Rear Hazard Avoidance - Left A' },
    { name: 'RHAZ_LEFT_B', fullName: 'Rear Hazard Avoidance - Left B' },
    { name: 'RHAZ_RIGHT_A', fullName: 'Rear Hazard Avoidance - Right A' },
    { name: 'RHAZ_RIGHT_B', fullName: 'Rear Hazard Avoidance - Right B' }
  ],
  perseverance: [
    { name: 'MCZ_LEFT', fullName: 'Mastcam-Z - Left' },
    { name: 'MCZ_RIGHT', fullName: 'Mastcam-Z - Right' },
    { name: 'NAVCAM_LEFT', fullName: 'Navigation Camera - Left' },
    { name: 'NAVCAM_RIGHT', fullName: 'Navigation Camera - Right' },
    { name: 'SUPERCAM_RMI', fullName: 'SuperCam Remote Micro-Imager' },
    { name: 'SHERLOC_WATSON', fullName: 'SHERLOC WATSON Camera' },
    { name: 'PIXL_MCC', fullName: 'PIXL Micro Context Camera' },
    { name: 'SKYCAM', fullName: 'MEDA Skycam' },
    {
      name: 'FRONT_HAZCAM_LEFT_A',
      fullName: 'Front Hazard Avoidance - Left A'
    },
    {
      name: 'FRONT_HAZCAM_RIGHT_A',
      fullName: 'Front Hazard Avoidance - Right A'
    },
    { name: 'REAR_HAZCAM_LEFT', fullName: 'Rear Hazard Avoidance - Left' },
    { name: 'REAR_HAZCAM_RIGHT', fullName: 'Rear Hazard Avoidance - Right' },
    { name: 'EDL_RUCAM', fullName: 'Entry, Descent & Landing Rover Up-Look' }
  ]
}
