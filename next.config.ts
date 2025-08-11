/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true
  },
  images: {
    domains: [
      'stsci-opo.org', // For Hubble/Webb telescope images
      'images.nasa.gov', // NASA's official image library
      'apod.nasa.gov', // Astronomy Picture of the Day
      'webbtelescope.org' // James Webb Telescope images
    ],
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
