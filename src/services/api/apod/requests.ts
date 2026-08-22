import { mockApodStats, mockFeaturedApod, mockRecentApods } from './mockData'
import type { ApodEntry, ApodStat } from './types'

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
