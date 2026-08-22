import { Box } from '@mui/material'

import theme from '@/theme/theme'
import { formatCompactNumber } from '@/utils/formatCompactNumber'

interface AsteroidApproachDiagramProps {
  missDistanceLunar: number
  isHazardous: boolean
}

const TRACK_START = 26
const TRACK_END = 286
const TRACK_Y = 52
const MAX_LUNAR = 130

// Miss distances span roughly 9 to 120 lunar distances, so a linear track would
// collapse the Moon marker onto Earth. A log scale keeps both readable.
const trackPosition = (lunar: number) => {
  const clamped = Math.min(Math.max(lunar, 0), MAX_LUNAR)
  const ratio = Math.log10(1 + clamped) / Math.log10(1 + MAX_LUNAR)
  return TRACK_START + ratio * (TRACK_END - TRACK_START)
}

export const AsteroidApproachDiagram = ({
  missDistanceLunar,
  isHazardous
}: AsteroidApproachDiagramProps) => {
  const moonX = trackPosition(1)
  const asteroidX = trackPosition(missDistanceLunar)
  const beyondScale = missDistanceLunar > MAX_LUNAR
  const accent = isHazardous
    ? theme.palette.warning.main
    : theme.palette.secondary.main

  const anchor =
    asteroidX > TRACK_END - 40
      ? 'end'
      : asteroidX < TRACK_START + 40
        ? 'start'
        : 'middle'
  const labelX =
    anchor === 'end' ? asteroidX + 6 : anchor === 'start' ? asteroidX - 6 : asteroidX

  return (
    <Box
      sx={{
        background:
          'radial-gradient(circle at 12% 60%, rgba(0, 194, 194, 0.16), transparent 55%), linear-gradient(145deg, #10103a, #0A0A2A)',
        borderBottom: `1px solid ${theme.palette.border.mainBorder}`
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 300 96"
        role="img"
        aria-label={`Approach distance ${formatCompactNumber(missDistanceLunar, 1)} lunar distances`}
        sx={{ width: '100%', display: 'block' }}
      >
        <line
          x1={TRACK_START}
          y1={TRACK_Y}
          x2={TRACK_END}
          y2={TRACK_Y}
          stroke={theme.palette.border.mainBorder}
          strokeWidth={1}
        />

        <circle
          cx={moonX}
          cy={TRACK_Y}
          r={14}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />

        <circle cx={TRACK_START} cy={TRACK_Y} r={10} fill="#2E6FD9" />
        <path
          d="M18 48c3-3 7-1 9-4s6 0 8-3"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={1.4}
          fill="none"
          strokeLinecap="round"
        />
        <text
          x={TRACK_START}
          y={80}
          textAnchor="middle"
          fill={theme.palette.text.secondary}
          fontSize={9}
        >
          Earth
        </text>

        <circle cx={moonX} cy={TRACK_Y} r={4} fill="#9AA0B5" />
        <text
          x={moonX}
          y={80}
          textAnchor="middle"
          fill={theme.palette.text.secondary}
          fontSize={9}
        >
          Moon
        </text>

        <line
          x1={asteroidX}
          y1={TRACK_Y - 16}
          x2={asteroidX}
          y2={TRACK_Y + 16}
          stroke={accent}
          strokeWidth={1}
          strokeDasharray="2 2"
          opacity={0.7}
        />
        <circle cx={asteroidX} cy={TRACK_Y} r={5.5} fill={accent} />
        <text
          x={labelX}
          y={30}
          textAnchor={anchor}
          fill={accent}
          fontSize={11}
          fontWeight={700}
        >
          {beyondScale ? '> 130' : formatCompactNumber(missDistanceLunar, 1)} LD
        </text>
      </Box>
    </Box>
  )
}
