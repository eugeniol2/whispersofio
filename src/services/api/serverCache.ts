// In-process cache for Route Handlers wrapping slow-changing NASA data.
// Deliberately explicit (rather than relying on Next's fetch Data Cache)
// so callers can surface real HIT/MISS state in a response header.
// Note: being in-process, it resets on server restart and isn't shared
// across multiple server instances if this is ever deployed behind
// horizontal scaling — fine for a single dev/`next start` process.
export function createServerCache<T>(revalidateMs: number) {
  let entry: { data: T; fetchedAt: number } | null = null

  return {
    get(): { data: T; ageSeconds: number } | null {
      if (!entry) return null
      const ageMs = Date.now() - entry.fetchedAt
      if (ageMs >= revalidateMs) return null
      return { data: entry.data, ageSeconds: Math.floor(ageMs / 1000) }
    },
    set(data: T) {
      entry = { data, fetchedAt: Date.now() }
    }
  }
}
