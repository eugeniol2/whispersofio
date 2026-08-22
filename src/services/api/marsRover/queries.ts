'use client'

import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { fetchRoverInfo, fetchRoverPhotos } from './requests'
import type { RoverName } from './types'

export function useRoverInfoQuery(rover: RoverName) {
  return useQuery({
    queryKey: queryKeys.marsRover.info(rover),
    queryFn: () => fetchRoverInfo(rover)
  })
}

interface UseRoverPhotosQueryParams {
  rover: RoverName
  sol: number
  camera: string
}

export function useRoverPhotosQuery({
  rover,
  sol,
  camera
}: UseRoverPhotosQueryParams) {
  return useQuery({
    queryKey: queryKeys.marsRover.photos(rover, sol, camera),
    queryFn: () =>
      fetchRoverPhotos({
        rover,
        sol,
        camera: camera === 'all' ? undefined : camera
      })
  })
}
