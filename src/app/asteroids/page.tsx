import { HydrationBoundary } from '@tanstack/react-query'

import { Asteroids } from '@/features/Asteroids'
import { getAsteroidFeed } from '@/services/api/asteroids/server'
import { createDehydratedState } from '@/services/api/prefetch'
import { queryKeys } from '@/services/api/queryKeys'

const DEFAULT_RANGE = 'today'

export const revalidate = 3600

export default async function AsteroidsPage() {
  const state = await createDehydratedState([
    async queryClient => {
      const { data } = await getAsteroidFeed(DEFAULT_RANGE)
      queryClient.setQueryData(queryKeys.asteroids.feed(DEFAULT_RANGE), data)
    }
  ])

  return (
    <HydrationBoundary state={state}>
      <Asteroids />
    </HydrationBoundary>
  )
}
