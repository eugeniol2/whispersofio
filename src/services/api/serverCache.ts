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
