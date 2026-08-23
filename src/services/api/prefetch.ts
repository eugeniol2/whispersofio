import { dehydrate, QueryClient } from '@tanstack/react-query'

type Seeder = (queryClient: QueryClient) => Promise<void>

export async function createDehydratedState(seeders: Seeder[]) {
  const queryClient = new QueryClient()

  await Promise.allSettled(seeders.map(seed => seed(queryClient)))

  return dehydrate(queryClient)
}
