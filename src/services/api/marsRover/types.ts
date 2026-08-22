export type RoverName = 'curiosity' | 'opportunity' | 'spirit' | 'perseverance'

export interface RoverCamera {
  name: string
  fullName: string
}

export interface RoverInfo {
  name: string
  status: 'active' | 'complete'
  launchDate: string
  landingDate: string
  maxSol: number
  maxDate: string
  totalPhotos: number
  cameras: RoverCamera[]
}

export interface MarsPhoto {
  id: number
  sol: number
  earthDate: string
  camera: RoverCamera
  imageLabel: string
}
