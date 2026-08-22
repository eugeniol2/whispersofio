export const queryKeys = {
  apod: {
    byDate: (date: string) => ['apod', 'byDate', date] as const,
    random: (token: number) => ['apod', 'random', token] as const,
    recent: ['apod', 'recent'] as const,
    stats: ['apod', 'stats'] as const
  },
  dashboard: {
    stats: ['dashboard', 'stats'] as const,
    featuredContent: ['dashboard', 'featuredContent'] as const,
    apiCollections: ['dashboard', 'apiCollections'] as const,
    activity: ['dashboard', 'activity'] as const
  },
  marsRover: {
    info: (rover: string) => ['marsRover', 'info', rover] as const,
    photos: (rover: string, sol: number, camera: string) =>
      ['marsRover', 'photos', rover, sol, camera] as const
  },
  eonet: {
    categories: ['eonet', 'categories'] as const,
    events: (
      status: string,
      categoryId: string,
      limit: number | string,
      timeRange: string
    ) => ['eonet', 'events', status, categoryId, limit, timeRange] as const
  },
  geocoding: {
    reverse: (lat: number, lon: number) =>
      ['geocoding', 'reverse', lat, lon] as const
  }
}
