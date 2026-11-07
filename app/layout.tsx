import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Inter } from 'next/font/google'
import { GeistMono } from 'geist/font/mono'
import { darkTheme, lightTheme } from '../theme/default-theme'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: lightTheme.background },
    { media: '(prefers-color-scheme: dark)', color: darkTheme.background },
  ],
}

export const metadata: Metadata = {
  title: 'deho.design',
  description: "derrick's design portfolio",
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.className} ${GeistMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
