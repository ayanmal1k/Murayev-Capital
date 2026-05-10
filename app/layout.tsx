import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://murayev-capital.com'),
  title: 'Murayev Capital | MRV Token on Solana',
  description: 'A Fan-Driven Token Project Supporting Innovation in Politics, Technological Progress, and Justice. Join the MRV token community on Solana.',
  generator: 'Murayev Capital',
  keywords: ['Murayev Capital', 'MRV Token', 'Solana Token', 'Fan-Driven Project', 'Blockchain Innovation'],
  authors: [{ name: 'Murayev Capital Team' }],
  openGraph: {
    title: 'Murayev Capital | MRV Token on Solana',
    description: 'A Fan-Driven Token Project Supporting Innovation in Politics, Technological Progress, and Justice',
    url: '/',
    siteName: 'Murayev Capital',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Murayev Capital Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Murayev Capital | MRV Token on Solana',
    description: 'A Fan-Driven Token Project Supporting Innovation in Politics, Technological Progress, and Justice',
    images: ['/logo.png'],
    creator: '@MurayevCapital',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
