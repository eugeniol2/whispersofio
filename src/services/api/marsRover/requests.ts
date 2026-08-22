import { mockRoverInfo, roverCameras } from './mockData'
import type { MarsPhoto, RoverInfo, RoverName } from './types'

const MOCK_LATENCY_MS = 400

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchRoverInfo(rover: RoverName): Promise<RoverInfo> {
  await delay(MOCK_LATENCY_MS)
  return mockRoverInfo[rover]
}

interface FetchRoverPhotosParams {
  rover: RoverName
  sol: number
  camera?: string
}

export async function fetchRoverPhotos({
  rover,
  sol,
  camera
}: FetchRoverPhotosParams): Promise<MarsPhoto[]> {
  await delay(MOCK_LATENCY_MS)

  const cameras = camera
    ? roverCameras[rover].filter(c => c.name === camera)
    : roverCameras[rover]
  const roverLabel = mockRoverInfo[rover].name

  return cameras.map((cam, index) => ({
    id: sol * 100 + index,
    sol,
    earthDate: mockRoverInfo[rover].landingDate,
    camera: cam,
    imageLabel: `${roverLabel} · ${cam.fullName} · Sol ${sol}`
  }))
}
