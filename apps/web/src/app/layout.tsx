import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './ui-globals.css'
import { FilmStripLoader } from '@/components/film-strip-loader'
import { ScrollProgress } from '@/components/scroll-progress'
import { Header } from '@/components/navigation/header'
import { PageTransition } from '@/components/transitions/page-transition'
import { CustomCursor } from '@/components/cursor/custom-cursor'
import { QueryProvider } from '@/lib/providers/query-provider'
import { Suspense } from 'react'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'La Fabulosa Oculta',
    template: '%s | La Fabulosa Oculta',
  },
  description: 'Cine como nunca lo viste. Análisis cinematográfico con una perspectiva única.',
  keywords: ['cine', 'películas', 'críticas', 'análisis', 'reviews', 'cinema', 'film'],
  authors: [{ name: 'La Fabulosa Oculta' }],
  creator: 'La Fabulosa Oculta',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://lafabulosaoculta.com',
    siteName: 'La Fabulosa Oculta',
    images: [
      {
        url: 'https://lafabulosaoculta.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lafabulosaoculta',
    creator: '@lafabulosaoculta',
  },
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} bg-background text-foreground font-sans antialiased`}>
        <QueryProvider>
          <Suspense fallback={null}>
            <FilmStripLoader />
          </Suspense>
          <Header />
          <ScrollProgress />
          <main className="pt-20">
            <PageTransition>{children}</PageTransition>
          </main>
        </QueryProvider>
      </body>
    </html>
  )
}
