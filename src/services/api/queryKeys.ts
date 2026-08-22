export const queryKeys = {
  apod: {
    byDate: (date: string) => ['apod', 'byDate', date] as const,
    random: (token: number) => ['apod', 'random', token] as const,
    recent: ['apod', 'recent'] as const,
    stats: ['apod', 'stats'] as const
  }
}
