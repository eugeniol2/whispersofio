import { Box, Typography } from '@mui/material'

import theme from '@/theme/theme'

interface ApodImagePlaceholderProps {
  label: string
  height?: number | string
}

export const ApodImagePlaceholder = ({
  label,
  height = 220
}: ApodImagePlaceholderProps) => (
  <Box
    sx={{
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      px: 2,
      background:
        'linear-gradient(135deg, rgba(74, 30, 106, 0.4), rgba(0, 194, 194, 0.15))',
      borderBottom: `1px solid ${theme.palette.border.mainBorder}`
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
    >
      {label}
    </Typography>
  </Box>
)
