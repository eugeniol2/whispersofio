import {
  CameraAlt as CameraIcon,
  Public as GlobeIcon,
  Satellite as SatelliteIcon
} from '@mui/icons-material'

export const getActivityIcon = (type: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    APOD: <CameraIcon color="secondary" />,
    earthquake: <GlobeIcon color="secondary" />,
    rover: <SatelliteIcon color="secondary" />,

    default: <GlobeIcon color="secondary" />
  }

  return iconMap[type] || iconMap.default
}
