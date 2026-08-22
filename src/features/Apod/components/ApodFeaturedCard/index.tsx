import DownloadIcon from '@mui/icons-material/Download'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography
} from '@mui/material'

import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import type { ApodEntry } from '@/services/api/apod/types'
import theme from '@/theme/theme'

interface ApodFeaturedCardProps {
  entry: ApodEntry
}

export const ApodFeaturedCard = ({ entry }: ApodFeaturedCardProps) => (
  <Card>
    <ImagePlaceholder label={entry.title} height={400} />
    <CardContent sx={{ p: 3 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Chip
            label="APOD"
            size="small"
            sx={{
              fontWeight: 700,
              background: theme.palette.secondary.main,
              color: theme.palette.common.black
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {entry.date}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton size="small" aria-label="download" color="secondary">
            <DownloadIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" aria-label="share" color="secondary">
            <ShareIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" aria-label="favorite" color="secondary">
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Typography variant="h5" sx={{ mt: 2, mb: 2, fontWeight: 700 }}>
        {entry.title}
      </Typography>

      <Typography variant="body1" color="text.secondary">
        {entry.description}
      </Typography>

      <Divider sx={{ my: 3, borderColor: theme.palette.border.mainBorder }} />

      <Box>
        <Typography variant="body2" color="text.secondary">
          Credit: {entry.credit}
        </Typography>
      </Box>
    </CardContent>
  </Card>
)
