import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Cormorant_Garamond, DM_Sans, Noto_Sans_Malayalam } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/metadata'
import { getRequestI18n } from '@/lib/i18n-server'
import { getOpenGraphLocale } from '@/lib/i18n'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const notoSansMalayalam = Noto_Sans_Malayalam({
  subsets: ['malayalam'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-malayalam',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getRequestI18n()

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: messages.seo.siteTitle,
      template: '%s | ARK Kerala Norway',
    },
    description: messages.seo.siteDescription,
    icons: {
      icon: [
        { url: siteConfig.icon },
        { url: siteConfig.iconPng, type: 'image/png', sizes: '512x512' },
      ],
      shortcut: [siteConfig.icon],
      apple: [{ url: siteConfig.appleIcon, sizes: '180x180', type: 'image/png' }],
    },
    keywords: [
      'Keralites Norway',
      'Malayalam community Stavanger',
      'ARK Rogaland',
      'Kerala association Norway',
      'Indian community Stavanger',
      'Onam Norway',
      'Kerala Norway',
    ],
    openGraph: {
      type: 'website',
      locale: getOpenGraphLocale(locale),
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: messages.seo.siteTitle,
      description: messages.seo.siteDescription,
      images: [
        {
          url: siteConfig.ogImage,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.seo.siteTitle,
      description: messages.seo.siteDescription,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { locale, messages } = await getRequestI18n()

  return (
    <html lang={locale} className={`${cormorant.variable} ${dmSans.variable} ${notoSansMalayalam.variable}`}>
      <body className="font-sans antialiased">
        <Nav locale={locale} navMessages={messages.nav} />
        {children}
        <Footer footerMessages={messages.footer} socialMessages={messages.common.socialLinks} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
