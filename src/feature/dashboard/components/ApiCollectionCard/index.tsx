// components/ApiCollectionCard.tsx
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ImageIcon from '@mui/icons-material/Image' // example placeholder icon
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material'

interface ApiCollectionCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  footerText?: string
  onClickArrowIcon?: () => void
}

export const ApiCollectionCard = ({
  icon = <ImageIcon fontSize="large" />,
  title,
  description,
  footerText,
  onClickArrowIcon
}: ApiCollectionCardProps) => {
  const theme = useTheme()

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 3,
        p: 3,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4]
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          <Typography variant="h6" sx={{ fontWeight: 600, userSelect: 'none' }}>
            {title}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, mt: 2, minHeight: 48 }}
        >
          {description}
        </Typography>

        <Box display="flex" justifyContent="space-between">
          {footerText && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mb: 1 }}
            >
              {footerText}
            </Typography>
          )}

          <Box sx={{ textAlign: 'right', cursor: 'pointer' }}>
            <ArrowForwardIcon
              fontSize="small"
              color="action"
              onClick={onClickArrowIcon}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
