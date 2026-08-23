import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query'

import { MarsRover } from '@/features/MarsRover'
import { DEFAULT_ROVER } from '@/services/api/marsRover/roverReference'
import { getRoverInfo } from '@/services/api/marsRover/server'
import { queryKeys } from '@/services/api/queryKeys'

export const revalidate = 3600

export default async function MarsRoverPage() {
  const queryClient = new QueryClient()
  const result = await getRoverInfo(DEFAULT_ROVER)

  if (result) {
    const { photos, ...info } = result.data

    queryClient.setQueryData(queryKeys.marsRover.info(DEFAULT_ROVER), info)
    queryClient.setQueryData(
      queryKeys.marsRover.photos(DEFAULT_ROVER, info.latestSol, 'all', 'all'),
      photos
    )
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MarsRover />
    </HydrationBoundary>
  )
}
