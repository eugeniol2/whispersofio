const NASA_API_BASE_URL = 'https://api.nasa.gov'
const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY ?? 'DEMO_KEY'

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
    throw new Error(`NASA API request failed: ${response.status} ${path}`)
  }

  return response.json()
}
