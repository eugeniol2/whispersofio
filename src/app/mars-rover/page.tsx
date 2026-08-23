import { HydrationBoundary } from '@tanstack/react-query'

import { MarsRover } from '@/features/MarsRover'
import { DEFAULT_ROVER } from '@/services/api/marsRover/roverReference'
import { getRoverInfo } from '@/services/api/marsRover/server'
import type { RoverName } from '@/services/api/marsRover/types'
import { createDehydratedState } from '@/services/api/prefetch'
import { queryKeys } from '@/services/api/queryKeys'

const ROVERS: RoverName[] = [DEFAULT_ROVER, 'perseverance']

export const revalidate = 3600

export default async function MarsRoverPage() {
  const state = await createDehydratedState([
    async queryClient => {
      
      for (const rover of ROVERS) {
        const result = await getRoverInfo(rover)
        if (!result) continue

        const { photos, cameras, ...info } = result.data

        queryClient.setQueryData(queryKeys.marsRover.info(rover), info)
        queryClient.setQueryData(
          queryKeys.marsRover.photos(rover, info.latestSol, 'all', 'all'),
          { photos, cameras }
        )
      }
    }
  ])

  return (
    <HydrationBoundary state={state}>
      <MarsRover />
    </HydrationBoundary>
  )
}
