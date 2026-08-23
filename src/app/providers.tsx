'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import ThemeRegistry from '@/components/ThemeRegistry'
import { ApiError } from '@/services/api/client'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              if (error instanceof ApiError) {
                // 429 is the one 4xx worth retrying: NASA's budgets refill on
                // their own, so backing off recovers where a reload would not.
                if (error.status === 429) return failureCount < 3
                if (error.status < 500) return false
              }
              return failureCount < 2
            },
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
