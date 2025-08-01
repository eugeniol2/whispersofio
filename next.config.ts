/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true
  },
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
  typescript: {
    ignoreBuildErrors: true
  },
  transpilePackages: ['@mui/material', '@mui/icons-material']
}

module.exports = nextConfig
