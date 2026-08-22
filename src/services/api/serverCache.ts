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

export function createKeyedServerCache<T>(revalidateMs: number, maxEntries = 50) {
  const entries = new Map<string, { data: T; fetchedAt: number }>()

  return {
    get(key: string): { data: T; ageSeconds: number } | null {
      const entry = entries.get(key)
      if (!entry) return null

      const ageMs = Date.now() - entry.fetchedAt
      if (ageMs >= revalidateMs) {
        entries.delete(key)
        return null
      }

      return { data: entry.data, ageSeconds: Math.floor(ageMs / 1000) }
    },
    set(key: string, data: T) {
      if (entries.size >= maxEntries) {
        const oldest = entries.keys().next().value
        if (oldest !== undefined) entries.delete(oldest)
      }
      entries.set(key, { data, fetchedAt: Date.now() })
    }
  }
}
