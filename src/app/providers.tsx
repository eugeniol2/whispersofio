'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import ThemeRegistry from '@/components/ThemeRegistry'
import { ApiError } from '@/services/api/client'

export default function Providers({
  children
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              // A 4xx (e.g. 429 rate limit) won't succeed on retry — only
              // back off and retry for transient 5xx/network failures.
              if (error instanceof ApiError && error.status < 500) return false
              return failureCount < 2
            },
            // Avoid refetching on every remount/window-refocus — most of
            // this data (e.g. today's APOD) doesn't change minute to
            // minute, and NASA's DEMO_KEY has a tight 30 req/hr cap.
            staleTime: 5 * 60 * 1000
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </QueryClientProvider>
  )
}
