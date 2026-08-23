import { HydrationBoundary } from '@tanstack/react-query'

import { Media } from '@/features/Media'
import { searchNasaMedia } from '@/services/api/nasaImages/requests'
import { nasaMediaTopics } from '@/services/api/nasaImages/topics'
import { createDehydratedState } from '@/services/api/prefetch'
import { queryKeys } from '@/services/api/queryKeys'

const DEFAULT_TOPIC = nasaMediaTopics[0]
const DEFAULT_MEDIA_TYPE = 'all'
const DEFAULT_PAGE = 1
const PAGE_SIZE = 24

export const revalidate = 3600

export default async function MediaPage() {
  const state = await createDehydratedState([
    async queryClient => {
      const result = await searchNasaMedia({
        query: DEFAULT_TOPIC.query,
        mediaType: DEFAULT_MEDIA_TYPE,
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE
      })
      queryClient.setQueryData(
        queryKeys.nasaImages.search(
          DEFAULT_TOPIC.query,
          DEFAULT_MEDIA_TYPE,
          DEFAULT_PAGE
        ),
        result
      )
    }
  ])

  return (
    <HydrationBoundary state={state}>
      <Media />
    </HydrationBoundary>
  )
}
