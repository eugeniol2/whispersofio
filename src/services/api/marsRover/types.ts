export type RoverName = 'curiosity' | 'perseverance'

export type CameraView = 'left' | 'right' | 'sky' | 'other'

export interface RoverCamera {
  name: string
  fullName: string
}

export interface RoverInfo {
  name: string
  status: 'active' | 'complete'
  launchDate: string
  landingDate: string
  latestSol: number
  latestDate: string
  totalImages: number
  cameras: RoverCamera[]
}

export interface MarsPhoto {
  id: string
  sol: number
  earthDate: string
  camera: RoverCamera
  imageUrl: string
  fullImageUrl: string
}

export interface RoverInfoPayload extends RoverInfo {
  photos: MarsPhoto[]
}
