'use client'

import {
  keepPreviousData,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { fetchRoverInfo, fetchRoverPhotos } from './requests'
import type { CameraView, RoverName } from './types'

export function useRoverInfoQuery(rover: RoverName) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: queryKeys.marsRover.info(rover),
    queryFn: async ({ signal }) => {
      const { photos, ...info } = await fetchRoverInfo(rover, signal)

      queryClient.setQueryData(
        queryKeys.marsRover.photos(rover, info.latestSol, 'all', 'all'),
        photos
      )

      return info
    }
  })
}

interface UseRoverPhotosQueryParams {
  rover: RoverName
  sol: number | null
  camera: string
  view: string
}

export function useRoverPhotosQuery({
  rover,
  sol,
  camera,
  view
}: UseRoverPhotosQueryParams) {
  return useQuery({
    queryKey: queryKeys.marsRover.photos(rover, sol ?? -1, camera, view),
    queryFn: ({ signal }) => {
      if (sol === null) throw new Error('Sol is required')

      return fetchRoverPhotos({
        rover,
        sol,
        camera: camera === 'all' ? undefined : camera,
        view: view === 'all' ? undefined : (view as CameraView),
        signal
      })
    },
    enabled: sol !== null,
    placeholderData: keepPreviousData
  })
}
