import { siteConfig } from './metadata'

export const socialLinkDefinitions = [
  {
    key: 'facebook',
    href: siteConfig.social.facebookGroupUrl,
    iconSrc: '/icons/social/facebook.svg',
  },
  {
    key: 'instagram',
    href: siteConfig.social.instagramUrl,
    iconSrc: '/icons/social/instagram.svg',
  },
  {
    key: 'whatsapp',
    href: siteConfig.social.whatsappUrl,
    iconSrc: '/icons/social/whatsapp.svg',
  },
  {
    key: 'youtube',
    href: siteConfig.social.youtubeUrl,
    iconSrc: '/icons/social/youtube.svg',
  },
] as const

export type SocialLinkKey = (typeof socialLinkDefinitions)[number]['key']

export default socialLinkDefinitions

