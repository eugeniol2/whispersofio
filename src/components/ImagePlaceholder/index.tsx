import { Box, Typography } from '@mui/material'

import theme from '@/theme/theme'

interface ImagePlaceholderProps {
  label: string
  height?: number | string
  borderSide?: 'bottom' | 'right'
}

export const ImagePlaceholder = ({
  label,
  height = 220,
  borderSide = 'bottom'
}: ImagePlaceholderProps) => (
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
      borderBottom:
        borderSide === 'bottom'
          ? `1px solid ${theme.palette.border.mainBorder}`
          : { xs: `1px solid ${theme.palette.border.mainBorder}`, md: 'none' },
      borderRight:
        borderSide === 'right'
          ? { xs: 'none', md: `1px solid ${theme.palette.border.mainBorder}` }
          : 'none'
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
