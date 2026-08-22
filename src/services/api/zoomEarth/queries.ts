'use client'

import { useQuery } from '@tanstack/react-query'

import { queryKeys } from '../queryKeys'
import { fetchZoomEarthLinkValid } from './requests'

export function useZoomEarthLinkQuery(slug: string | null) {
  return useQuery({
    queryKey: queryKeys.zoomEarth.linkValid(slug ?? ''),
    queryFn: ({ signal }) => fetchZoomEarthLinkValid(slug as string, signal),
    enabled: slug !== null,
    staleTime: Infinity // a storm page's existence never changes once verified
  })
}
