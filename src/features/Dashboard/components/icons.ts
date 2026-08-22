import type { SvgIconComponent } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import CameraIcon from '@mui/icons-material/Camera'
import ImageIcon from '@mui/icons-material/Image'
import LanguageIcon from '@mui/icons-material/Language'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import PublicIcon from '@mui/icons-material/Public'

import type { DashboardIconKey } from '@/services/api/dashboard/types'

export const dashboardIcons: Record<DashboardIconKey, SvgIconComponent> = {
  apod: ImageIcon,
  earthEvents: PublicIcon,
  marsRover: CameraIcon,
  media: LibraryBooksIcon,
  asteroids: LanguageIcon,
  more: AddIcon
}
