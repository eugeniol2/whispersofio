import type { DashboardApiCollection } from './types'

export const mockDashboardApiCollections: DashboardApiCollection[] = [
  {
    id: 'apod',
    icon: 'apod',
    title: 'APOD',
    description:
      'Discover a new astronomical image every day with detailed explanations from NASA scientists.',
    caption: 'Updated daily',
    href: '/apod'
  },
  {
    id: 'earth-events',
    icon: 'earthEvents',
    title: 'Earth Events',
    description:
      'Track natural events and disasters happening around the globe in real-time.',
    caption: 'Live data',
    href: '/earth-events'
  },
  {
    id: 'mars-rover',
    icon: 'marsRover',
    title: 'Mars Rover Photos',
    description:
      "Explore Mars through the eyes of NASA's rovers with thousands of high-resolution images.",
    caption: '3 active rovers',
    href: '/mars-rover'
  },
  {
    id: 'media',
    icon: 'media',
    title: 'Media Library',
    description:
      "Browse NASA's vast collection of images, videos, and audio recordings from space missions.",
    caption: '140K+ items',
    href: '/media'
  },
  {
    id: 'asteroids',
    icon: 'asteroids',
    title: 'Asteroids NeoWs',
    description:
      'Monitor near-Earth objects and potentially hazardous asteroids approaching our planet.',
    caption: 'Real-time tracking',
    href: '/asteroids'
  },
  {
    id: 'more',
    icon: 'more',
    title: 'More APIs',
    description:
      'Explore additional NASA APIs including weather data, satellite imagery, and more.',
    caption: 'Coming soon',
    href: null
  }
]
