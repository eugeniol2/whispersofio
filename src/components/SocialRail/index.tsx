import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { Box, IconButton, Stack, Tooltip } from '@mui/material'

import theme from '@/theme/theme'

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/eugeniol2',
    Icon: GitHubIcon
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/eugenio-dorneles-araujo/',
    Icon: LinkedInIcon
  }
]

export const SocialRail = () => (
  <Stack
    alignItems="center"
    spacing={1}
    sx={{
      position: 'fixed',
      left: 20,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      display: { xs: 'none', md: 'flex' }
    }}
  >
    {links.map(({ label, href, Icon }) => (
      <Tooltip key={label} title={label} placement="right">
        <IconButton
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          sx={{
            color: theme.palette.text.secondary,
            border: `1px solid ${theme.palette.border.mainBorder}`,
            background: 'rgba(10, 10, 42, 0.6)',
            backdropFilter: 'blur(6px)',
            transition: 'color 0.2s ease, border-color 0.2s ease',
            '&:hover': {
              color: theme.palette.secondary.main,
              borderColor: theme.palette.secondary.main,
              background: 'rgba(0, 194, 194, 0.1)'
            }
          }}
        >
          <Icon fontSize="small" />
        </IconButton>
      </Tooltip>
    ))}

    <Box
      sx={{
        width: '1px',
        height: 64,
        mt: 1,
        background: `linear-gradient(to bottom, ${theme.palette.border.mainBorder}, transparent)`
      }}
    />
  </Stack>
)
