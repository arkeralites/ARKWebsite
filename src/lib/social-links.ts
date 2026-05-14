import { siteConfig } from './metadata'

export const socialLinks = [
  {
    label: 'Facebook',
    href: siteConfig.social.facebookGroupUrl,
    iconSrc: '/icons/social/facebook.svg',
    ariaLabel: 'ARK on Facebook',
  },
  {
    label: 'Instagram',
    href: siteConfig.social.instagramUrl,
    iconSrc: '/icons/social/instagram.svg',
    ariaLabel: 'ARK on Instagram',
  },
  {
    label: 'WhatsApp',
    href: siteConfig.social.whatsappUrl,
    iconSrc: '/icons/social/whatsapp.svg',
    ariaLabel: 'Join ARK on WhatsApp',
  },
  {
    label: 'YouTube',
    href: siteConfig.social.youtubeUrl,
    iconSrc: '/icons/social/youtube.svg',
    ariaLabel: 'ARK on YouTube',
  },
] as const

export default socialLinks

