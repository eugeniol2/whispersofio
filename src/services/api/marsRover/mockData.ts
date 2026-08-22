import type { RoverCamera, RoverInfo, RoverName } from './types'

// Camera codes match NASA's real Mars Rover Photos API
// (https://api.nasa.gov/mars-photos/api/v1/rovers/{rover}/photos).
export const roverCameras: Record<RoverName, RoverCamera[]> = {
  curiosity: [
    { name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' },
    { name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
    { name: 'MAST', fullName: 'Mast Camera' },
    { name: 'CHEMCAM', fullName: 'Chemistry and Camera Complex' },
    { name: 'MAHLI', fullName: 'Mars Hand Lens Imager' },
    { name: 'MARDI', fullName: 'Mars Descent Imager' },
    { name: 'NAVCAM', fullName: 'Navigation Camera' }
  ],
  opportunity: [
    { name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' },
    { name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
    { name: 'NAVCAM', fullName: 'Navigation Camera' },
    { name: 'PANCAM', fullName: 'Panoramic Camera' },
    { name: 'MINITES', fullName: 'Miniature Thermal Emission Spectrometer' }
  ],
  spirit: [
    { name: 'FHAZ', fullName: 'Front Hazard Avoidance Camera' },
    { name: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera' },
    { name: 'NAVCAM', fullName: 'Navigation Camera' },
    { name: 'PANCAM', fullName: 'Panoramic Camera' },
    { name: 'MINITES', fullName: 'Miniature Thermal Emission Spectrometer' }
  ],
  perseverance: [
    { name: 'NAVCAM_LEFT', fullName: 'Navigation Camera - Left' },
    { name: 'NAVCAM_RIGHT', fullName: 'Navigation Camera - Right' },
    { name: 'MCZ_LEFT', fullName: 'Mastcam-Z Left' },
    { name: 'MCZ_RIGHT', fullName: 'Mastcam-Z Right' },
    { name: 'FRONT_HAZCAM_LEFT_A', fullName: 'Front Hazard Avoidance Camera' },
    { name: 'REAR_HAZCAM_LEFT', fullName: 'Rear Hazard Avoidance Camera' },
    { name: 'SKYCAM', fullName: 'MEDA Skycam' },
    { name: 'SHERLOC_WATSON', fullName: 'SHERLOC WATSON Camera' }
  ]
}

export const mockRoverInfo: Record<RoverName, RoverInfo> = {
  curiosity: {
    name: 'Curiosity',
    status: 'active',
    launchDate: '2011-11-26',
    landingDate: '2012-08-06',
    maxSol: 4000,
    maxDate: '2024-02-19',
    totalPhotos: 695897,
    cameras: roverCameras.curiosity
  },
  opportunity: {
    name: 'Opportunity',
    status: 'complete',
    launchDate: '2003-07-07',
    landingDate: '2004-01-25',
    maxSol: 5111,
    maxDate: '2018-06-11',
    totalPhotos: 198439,
    cameras: roverCameras.opportunity
  },
  spirit: {
    name: 'Spirit',
    status: 'complete',
    launchDate: '2003-06-10',
    landingDate: '2004-01-04',
    maxSol: 2208,
    maxDate: '2010-03-21',
    totalPhotos: 124550,
    cameras: roverCameras.spirit
  },
  perseverance: {
    name: 'Perseverance',
    status: 'active',
    launchDate: '2020-07-30',
    landingDate: '2021-02-18',
    maxSol: 1000,
    maxDate: '2023-11-02',
    totalPhotos: 237025,
    cameras: roverCameras.perseverance
  }
}
