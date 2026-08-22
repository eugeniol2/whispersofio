import { eonetCategories, mockEonetEvents } from './mockData'
import type { EonetCategory, EonetEvent, EonetStatusFilter } from './types'

// Stand-in for NASA's real EONET API
// (https://eonet.gsfc.nasa.gov/api/v3/events?status=X&category=Y and
// .../categories). Both exports already have the async shape a real
// request would have, so swapping the body for a real fetch is a
// drop-in change:
//
//   export async function fetchEonetEvents(params: FetchEonetEventsParams) {
//     const { events } = await apiClient('/eonet/v3/events', {
//       params: { status: params.status, category: params.categoryId }
//     })
//     return events
//   }

const MOCK_LATENCY_MS = 400

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchEonetCategories(): Promise<EonetCategory[]> {
  await delay(MOCK_LATENCY_MS)
  return eonetCategories
}

interface FetchEonetEventsParams {
  status: EonetStatusFilter
  categoryId?: string
}

export async function fetchEonetEvents({
  status,
  categoryId
}: FetchEonetEventsParams): Promise<EonetEvent[]> {
  await delay(MOCK_LATENCY_MS)

  return mockEonetEvents.filter(event => {
    const matchesStatus =
      status === 'all'
        ? true
        : status === 'open'
          ? event.closed === null
          : event.closed !== null
    const matchesCategory =
      !categoryId || event.categories.some(c => c.id === categoryId)

    return matchesStatus && matchesCategory
  })
}
