import type { Metadata } from 'next'
import { getOpenGraphLocale, type Locale } from './i18n'

export const siteConfig = {
  name: 'ARK — Association of Rogaland Keralites',
  url: 'https://kerala.no',
  icon: '/favicon.ico',
  iconPng: '/icon-512.png',
  appleIcon: '/apple-touch-icon.png',
  description:
    'A home away from home for Keralites in Stavanger, Sandnes and Rogaland, Norway. ARK brings together the Kerala community through culture, support, and celebration.',
  // Link-preview image for Facebook, WhatsApp, X, LinkedIn etc. MUST stay
  // 1200x630 (1.91:1) to match the dimensions declared in the metadata below —
  // the old value was the 1180x756 logo declared as 1200x630, so previews
  // cropped it. Regenerate at the same size if the branding changes.
  ogImage: 'https://kerala.no/images/ark-share-card.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  contact: {
    email: 'arkeralites@gmail.com',
    location: 'Sandnes, Rogaland, Norway',
    orgNumber: '919 226 447',
  },
  social: {
    facebookGroupUrl: 'https://www.facebook.com/groups/773186669487656',
    instagramUrl: 'https://www.instagram.com/ark_norway',
    whatsappUrl:
      'mailto:arkeralites@gmail.com?subject=Join%20ARK%20WhatsApp%20Community&body=Hi%20ARK%2C%0A%0AI%20would%20like%20to%20join%20the%20ARK%20WhatsApp%20community%20group.%0A',
    youtubeUrl: 'https://www.youtube.com/@RogalandKeralites',
  },
} as const

export function generatePageMetadata(
  title: string,
  description: string,
  pagePath: string,
  locale: Locale = 'en'
): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: `${title} | ARK Kerala Norway`,
      description,
      url: `${siteConfig.url}${pagePath}`,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: siteConfig.name,
        },
      ],
      locale: getOpenGraphLocale(locale),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ARK Kerala Norway`,
      description,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: `${siteConfig.url}${pagePath}`,
    },
  }
}
