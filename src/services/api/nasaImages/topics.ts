export interface NasaMediaTopic {
  id: string
  label: string
  query: string
}

export const nasaMediaTopics: NasaMediaTopic[] = [
  { id: 'apollo', label: 'Apollo Program', query: 'Apollo program' },
  { id: 'mercury', label: 'Mercury Program', query: 'Mercury program' },
  { id: 'gemini', label: 'Gemini Program', query: 'Gemini program' },
  { id: 'shuttle', label: 'Space Shuttle', query: 'Space Shuttle' },
  { id: 'iss', label: 'Space Station', query: 'International Space Station' },
  { id: 'artemis', label: 'Artemis', query: 'Artemis' },
  { id: 'hubble', label: 'Hubble', query: 'Hubble Space Telescope' },
  { id: 'webb', label: 'James Webb', query: 'James Webb Space Telescope' },
  { id: 'mars', label: 'Mars Exploration', query: 'Mars rover' },
  { id: 'voyager', label: 'Voyager', query: 'Voyager spacecraft' }
]
