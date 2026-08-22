'use client'

import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

import { useNasaMediaSearchQuery } from '@/services/api/nasaImages/queries'
import { nasaMediaTopics } from '@/services/api/nasaImages/topics'
import type {
  NasaMediaItem,
  NasaMediaTypeFilter
} from '@/services/api/nasaImages/types'
import { useDebouncedValue } from '@/utils/useDebouncedValue'

import { MediaCard } from './components/MediaCard'
import { MediaDetailDialog } from './components/MediaDetailDialog'
import { MediaFilters } from './components/MediaFilters'

const PAGE_SIZE = 24
const MAX_PAGES = 40
const DEFAULT_TOPIC = nasaMediaTopics[0]

export function Media() {
  const [search, setSearch] = useState(DEFAULT_TOPIC.query)
  const [activeTopicId, setActiveTopicId] = useState<string | null>(
    DEFAULT_TOPIC.id
  )
  const [mediaType, setMediaType] = useState<NasaMediaTypeFilter>('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<NasaMediaItem | null>(null)

  const debouncedSearch = useDebouncedValue(search)

  const query = useNasaMediaSearchQuery({
    query: debouncedSearch,
    mediaType,
    page,
    pageSize: PAGE_SIZE
  })

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, mediaType])

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setActiveTopicId(null)
  }

  const handleTopicSelect = (topicId: string) => {
    const topic = nasaMediaTopics.find(item => item.id === topicId)
    if (!topic) return

    setActiveTopicId(topic.id)
    setSearch(topic.query)
  }

  const pageCount = useMemo(() => {
    if (!query.data) return 0
    return Math.min(Math.ceil(query.data.totalHits / PAGE_SIZE), MAX_PAGES)
  }, [query.data])

  return (
    <Container maxWidth="lg" sx={{ pb: 8 }}>
      <Stack
        spacing={1}
        alignItems="center"
        textAlign="center"
        sx={{ pt: 4, pb: 4 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Media Library
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 680 }}
        >
          Explore NASA&apos;s documented history — missions, spacecraft and the
          people behind them, straight from the official Image and Video
          Library.
        </Typography>
      </Stack>

      <MediaFilters
        search={search}
        onSearchChange={handleSearchChange}
        mediaType={mediaType}
        onMediaTypeChange={setMediaType}
        activeTopicId={activeTopicId}
        onTopicSelect={handleTopicSelect}
      />

      {query.isError ? (
        <Alert severity="error">Failed to load the NASA media library.</Alert>
      ) : query.isPending ? (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress color="secondary" />
        </Stack>
      ) : query.data.items.length === 0 ? (
        <Alert severity="info">
          No results for this search. Try another mission or keyword.
        </Alert>
      ) : (
        <Stack spacing={4}>
          <Typography variant="body2" color="text.secondary">
            {query.data.totalHits.toLocaleString('en-US')} results
          </Typography>

          <Grid container spacing={3}>
            {query.data.items.map(item => (
              <Grid key={item.id} item xs={12} sm={6} md={4}>
                <MediaCard item={item} onSelect={setSelected} />
              </Grid>
            ))}
          </Grid>

          {pageCount > 1 && (
            <Stack alignItems="center">
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="secondary"
                shape="rounded"
              />
            </Stack>
          )}
        </Stack>
      )}

      <MediaDetailDialog item={selected} onClose={() => setSelected(null)} />
    </Container>
  )
}
