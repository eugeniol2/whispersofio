import { Box, Card, CardContent, Typography } from '@mui/material'

import theme from '@/app/theme/theme'

interface CustomCardProps {
  value: string
  label: string
  icon?: React.ReactNode
}

export const InfoCard = ({ value, label, icon }: CustomCardProps) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        width: '250px',
        height: '90px',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        {icon && (
          <Box
            sx={{
              color: theme.palette.primary.main
            }}
          >
            {icon}
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexGrow: 1
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.5rem'
            }}
          >
            {value}
          </Typography>

          <Typography
            variant="h6"
            component="p"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500
            }}
          >
            {label}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
