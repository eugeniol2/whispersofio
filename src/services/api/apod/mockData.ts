import type { ApodEntry, ApodStat } from './types'

export const mockFeaturedApod: ApodEntry = {
  id: 'featured-orion-nebula',
  date: 'January 15, 2025',
  title: 'The Orion Nebula in Infrared Light',
  description:
    'The Orion Nebula is among the most intensively studied celestial features. The nebula is only 1,500 light-years distant, making it the closest star-forming region to Earth and giving it a relatively large apparent size. The Orion Nebula is pictured above in infrared light by the Spitzer Space Telescope. The perspective emphasizes how the nebula is a star forming region composed of mostly hot gas and dark dust. The power behind much of the Orion Nebula comes from the four bright stars in the Trapezium cluster, which continually bathe the nebula in ultraviolet light.',
  credit: 'NASA, JPL-Caltech, Spitzer Space Telescope'
}

export const mockRecentApods: ApodEntry[] = [
  {
    id: 'saturn-rings',
    date: 'January 14, 2025',
    title: "Saturn's Magnificent Rings",
    description:
      "A detailed view of Saturn's ring system captured by the Cassini spacecraft.",
    credit: 'NASA, JPL-Caltech'
  },
  {
    id: 'andromeda-galaxy',
    date: 'January 13, 2025',
    title: 'The Andromeda Galaxy',
    description: 'Our nearest galactic neighbor in all its spiral glory.',
    credit: 'NASA, ESA'
  },
  {
    id: 'aurora-iceland',
    date: 'January 12, 2025',
    title: 'Aurora Over Iceland',
    description:
      'Spectacular northern lights dancing across the night sky.',
    credit: 'NASA'
  },
  {
    id: 'mars-landscape',
    date: 'January 11, 2025',
    title: 'Mars Landscape',
    description:
      "A panoramic view of the Martian surface from Perseverance rover.",
    credit: 'NASA, JPL-Caltech'
  },
  {
    id: 'pillars-of-creation',
    date: 'January 10, 2025',
    title: 'Pillars of Creation',
    description: 'The famous star-forming region in the Eagle Nebula.',
    credit: 'NASA, ESA, Hubble'
  },
  {
    id: 'jupiter-great-red-spot',
    date: 'January 9, 2025',
    title: "Jupiter's Great Red Spot",
    description: 'The giant storm that has raged on Jupiter for centuries.',
    credit: 'NASA, JPL-Caltech'
  }
]

export const mockApodStats: ApodStat[] = [
  { value: '9,847', label: 'Total APOD Images' },
  { value: '28', label: 'Years Running' },
  { value: '365', label: 'Images Per Year' },
  { value: '2.3M', label: 'Daily Visitors' }
]
