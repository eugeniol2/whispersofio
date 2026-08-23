import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.nasa.gov'
      }
    ]
  },
  eslint: {
    dirs: ['src']
  },
  transpilePackages: ['@mui/material', '@mui/icons-material']
}

export default nextConfig
