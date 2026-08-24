import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import DashboardLayout from '@/components/DashBoardLayout'

import Providers from './providers'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Whispers of Io — NASA Data Explorer',
  description:
    "Astronomy pictures, live natural events, Mars rover imagery, near-Earth asteroids and NASA's media archive, in one dark-sky dashboard."
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
