import { NASA_API_BASE_URL } from './endpoints'

const NASA_API_KEY = process.env.NASA_API_KEY ?? 'DEMO_KEY'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

interface ApiClientOptions extends RequestInit {
  params?: Record<string, string | number | undefined>
}

export async function apiClient<T>(
  path: string,
  { params, ...init }: ApiClientOptions = {}
): Promise<T> {
  const url = new URL(path, NASA_API_BASE_URL)
  url.searchParams.set('api_key', NASA_API_KEY)

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value))
  }

  const response = await fetch(url, init)

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `NASA API request failed: ${response.status} ${path}`
    )
  }

  return response.json()
}
