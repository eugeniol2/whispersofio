import AddIcon from '@mui/icons-material/Add'
import ImageIcon from '@mui/icons-material/Image'
import PublicIcon from '@mui/icons-material/Public'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { Box, Container, Typography } from '@mui/material'

import theme from '@/app/theme/theme'

import { ApiCollectionCard } from './components/ApiCollectionCard'
import { InfoCard } from './components/CustomCard'
import { CustomCard } from './components/ImageCard'

export const DashBoard = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 8,
        '& > *:not(:last-child)': { mb: 8 }
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: 800,
          mx: 'auto',
          mb: 8,
          px: 2
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}
        >
          Explore the Universe with NASA APIs
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          sx={{
            fontWeight: 400,
            lineHeight: 1.6
          }}
        >
          {
            "Access real-time space data, stunning imagery, and scientific discoveries from NASA's comprehensive collection of APIs. "
          }
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          justifyItems: 'center'
        }}
      >
        <InfoCard value="2,847" label="Images Today" />
        <InfoCard value="156" label="Earth Events" />
        <InfoCard value="23" label="Near Asteroids" />
        <InfoCard value="1,234" label="Mars Photos" />
      </Box>
      <CustomCard
        image="https://stsci-opo.org/STScI-01HYGK7PC1NBR9N26JAJ97W1XR.png"
        title="title"
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3,
          mb: 8
        }}
      >
        <ApiCollectionCard
          icon={<ImageIcon />}
          title="APOD"
          description="Discover a new astronomical image every day with detailed explanations from NASA scientists."
          footerText="Updated daily"
        />
        <ApiCollectionCard
          icon={<PublicIcon />}
          title="Earth Events"
          description="Track natural events and disasters happening around the globe in real-time."
          footerText="Live data"
        />
        <ApiCollectionCard
          icon={<RocketLaunchIcon />}
          title="Mars Rover Photos"
          description="Explore Mars through the eyes of NASA's rovers with thousands of high-resolution images."
          footerText="3 active rovers"
        />
        <ApiCollectionCard
          icon={<VideoLibraryIcon />}
          title="Media Library"
          description="Browse NASA's vast collection of images, videos, and audio recordings from space missions."
          footerText="140K+ items"
        />
        <ApiCollectionCard
          icon={<WarningAmberIcon />}
          title="Asteroids NeoWs"
          description="Monitor near-Earth objects and potentially hazardous asteroids approaching our planet."
          footerText="Real-time tracking"
        />
        <ApiCollectionCard
          icon={<AddIcon />}
          title="More APIs"
          description="Explore additional NASA APIs including weather data, satellite imagery, and more."
          footerText="Coming soon"
        />
      </Box>
    </Container>
  )
}
