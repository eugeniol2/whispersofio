import { mockApodStats, mockFeaturedApod, mockRecentApods } from './mockData'
import type { ApodEntry, ApodStat } from './types'

// Stand-in for NASA's real APOD endpoint (https://api.nasa.gov/planetary/apod).
// Every export here already has the async shape a real fetch call would have,
// so swapping the body for a real request is a drop-in change:
//
//   export async function fetchApod(date: string): Promise<ApodEntry> {
//     return apiClient<ApodEntry>('/planetary/apod', { params: { date } })
//   }

const MOCK_LATENCY_MS = 400

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchApod(date: string): Promise<ApodEntry> {
  await delay(MOCK_LATENCY_MS)
  return { ...mockFeaturedApod, date }
}

export async function fetchRandomApod(): Promise<ApodEntry> {
  await delay(MOCK_LATENCY_MS)
  const pool = [mockFeaturedApod, ...mockRecentApods]
  return pool[Math.floor(Math.random() * pool.length)]
}

export async function fetchRecentApods(): Promise<ApodEntry[]> {
  await delay(MOCK_LATENCY_MS)
  return mockRecentApods
}

export async function fetchApodStats(): Promise<ApodStat[]> {
  await delay(MOCK_LATENCY_MS)
  return mockApodStats
}
