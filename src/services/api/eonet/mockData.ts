import type { EonetCategory, EonetEvent } from './types'

// Category set matches NASA's real EONET categories
// (https://eonet.gsfc.nasa.gov/api/v3/categories).
export const eonetCategories: EonetCategory[] = [
  { id: 'wildfires', title: 'Wildfires' },
  { id: 'severeStorms', title: 'Severe Storms' },
  { id: 'volcanoes', title: 'Volcanoes' },
  { id: 'seaLakeIce', title: 'Sea and Lake Ice' },
  { id: 'earthquakes', title: 'Earthquakes' },
  { id: 'drought', title: 'Drought' },
  { id: 'dustHaze', title: 'Dust and Haze' },
  { id: 'floods', title: 'Floods' },
  { id: 'landslides', title: 'Landslides' },
  { id: 'manmade', title: 'Manmade' },
  { id: 'snow', title: 'Snow' },
  { id: 'tempExtremes', title: 'Temperature Extremes' },
  { id: 'waterColor', title: 'Water Color' }
]

const category = (id: (typeof eonetCategories)[number]['id']) =>
  eonetCategories.find(c => c.id === id)!

export const mockEonetEvents: EonetEvent[] = [
  {
    id: 'EONET_6162',
    title: 'Wildfire - Point Fire, California',
    description: null,
    link: 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6162',
    closed: null,
    categories: [category('wildfires')],
    sources: [{ id: 'InciWeb', url: 'https://inciweb.wildfire.gov/' }],
    geometry: [
      { date: '2026-08-15T00:00:00Z', type: 'Point', coordinates: [-121.5, 39.3] }
    ]
  },
  {
    id: 'EONET_6158',
    title: 'Severe Storm - Tropical Cyclone Freddy',
    description: null,
    link: 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6158',
    closed: '2026-08-18T00:00:00Z',
    categories: [category('severeStorms')],
    sources: [{ id: 'JTWC', url: 'https://www.metoc.navy.mil/jtwc/jtwc.html' }],
    geometry: [
      { date: '2026-08-12T00:00:00Z', type: 'Point', coordinates: [56.2, -18.4] }
    ]
  },
  {
    id: 'EONET_6141',
    title: 'Mauna Loa Volcano, Hawaii',
    description: null,
    link: 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6141',
    closed: null,
    categories: [category('volcanoes')],
    sources: [{ id: 'HVO', url: 'https://www.usgs.gov/volcanoes/mauna-loa' }],
    geometry: [
      { date: '2026-08-10T00:00:00Z', type: 'Point', coordinates: [-155.6, 19.5] }
    ]
  },
  {
    id: 'EONET_6130',
    title: 'Sea Ice Breakup - Beaufort Sea',
    description: null,
    link: 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6130',
    closed: null,
    categories: [category('seaLakeIce')],
    sources: [{ id: 'NSIDC', url: 'https://nsidc.org/' }],
    geometry: [
      { date: '2026-08-09T00:00:00Z', type: 'Point', coordinates: [-140.0, 71.5] }
    ]
  },
  {
    id: 'EONET_6125',
    title: 'Earthquake M6.1 - Off the Coast of Sumatra',
    description: null,
    link: 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6125',
    closed: '2026-08-07T00:00:00Z',
    categories: [category('earthquakes')],
    sources: [{ id: 'USGS', url: 'https://earthquake.usgs.gov/' }],
    geometry: [
      { date: '2026-08-06T00:00:00Z', type: 'Point', coordinates: [95.9, -1.4] }
    ]
  },
  {
    id: 'EONET_6119',
    title: 'Drought - Horn of Africa',
    description: null,
    link: 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6119',
    closed: null,
    categories: [category('drought')],
    sources: [{ id: 'PDU', url: 'https://www.gdacs.org/' }],
    geometry: [
      { date: '2026-08-01T00:00:00Z', type: 'Point', coordinates: [42.5, 8.9] }
    ]
  },
  {
    id: 'EONET_6110',
    title: 'Dust Storm - Sahara to Canary Islands',
    description: null,
    link: 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6110',
    closed: '2026-08-05T00:00:00Z',
    categories: [category('dustHaze')],
    sources: [{ id: 'MODIS', url: 'https://modis.gsfc.nasa.gov/' }],
    geometry: [
      { date: '2026-08-03T00:00:00Z', type: 'Point', coordinates: [-15.4, 28.1] }
    ]
  },
  {
    id: 'EONET_6104',
    title: 'Flooding - Yangtze River Basin, China',
    description: null,
    link: 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6104',
    closed: null,
    categories: [category('floods')],
    sources: [{ id: 'GDACS', url: 'https://www.gdacs.org/' }],
    geometry: [
      { date: '2026-07-30T00:00:00Z', type: 'Point', coordinates: [113.5, 30.5] }
    ]
  },
  {
    id: 'EONET_6099',
    title: 'Landslide - Kerala, India',
    description: null,
    link: 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6099',
    closed: '2026-07-29T00:00:00Z',
    categories: [category('landslides')],
    sources: [{ id: 'GDACS', url: 'https://www.gdacs.org/' }],
    geometry: [
      { date: '2026-07-27T00:00:00Z', type: 'Point', coordinates: [76.3, 10.9] }
    ]
  },
  {
    id: 'EONET_6091',
    title: 'Temperature Extreme - Heatwave, Southern Europe',
    description: null,
    link: 'https://eonet.gsfc.nasa.gov/api/v3/events/EONET_6091',
    closed: null,
    categories: [category('tempExtremes')],
    sources: [{ id: 'MODIS', url: 'https://modis.gsfc.nasa.gov/' }],
    geometry: [
      { date: '2026-07-25T00:00:00Z', type: 'Point', coordinates: [14.5, 41.9] }
    ]
  }
]
