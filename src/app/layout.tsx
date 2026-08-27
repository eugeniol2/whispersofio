import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import DashboardLayout from '@/components/DashBoardLayout'

import Providers from './providers'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap'
})

const SITE_URL = 'https://whispersofio.vercel.app'
const SITE_TITLE = 'Whispers of Io: NASA Data Explorer'
const SITE_DESCRIPTION =
  "Astronomy pictures, live natural events, Mars rover imagery, near-Earth asteroids and NASA's media archive, in one dark-sky dashboard."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Whispers of Io',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        <Providers>
          <DashboardLayout>{children}</DashboardLayout>
        </Providers>
      </body>
    </html>
  )
}
