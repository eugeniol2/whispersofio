import type { SvgIconComponent } from '@mui/icons-material'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import BlurOnIcon from '@mui/icons-material/BlurOn'
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat'
import FactoryIcon from '@mui/icons-material/Factory'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import PublicIcon from '@mui/icons-material/Public'
import TerrainIcon from '@mui/icons-material/Terrain'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import VibrationIcon from '@mui/icons-material/Vibration'
import WaterIcon from '@mui/icons-material/Water'
import WbSunnyIcon from '@mui/icons-material/WbSunny'

import type { EonetCategoryId } from '@/services/api/eonet/types'

export const eonetCategoryIcons: Record<EonetCategoryId, SvgIconComponent> = {
  wildfires: LocalFireDepartmentIcon,
  severeStorms: ThunderstormIcon,
  volcanoes: TerrainIcon,
  seaLakeIce: AcUnitIcon,
  earthquakes: VibrationIcon,
  drought: WbSunnyIcon,
  dustHaze: BlurOnIcon,
  floods: WaterIcon,
  landslides: TerrainIcon,
  manmade: FactoryIcon,
  snow: AcUnitIcon,
  tempExtremes: DeviceThermostatIcon,
  waterColor: WaterIcon
}

// EONET can add categories at any time, so an id we don't know yet falls back
// to the generic globe instead of rendering nothing.
export const getEonetCategoryIcon = (categoryId: string): SvgIconComponent =>
  eonetCategoryIcons[categoryId as EonetCategoryId] ?? PublicIcon
