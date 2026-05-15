import Link from 'next/link'
import Image from 'next/image'
import type { AppMessages } from '@/lib/i18n'
import { siteConfig } from '@/lib/metadata'
import { socialLinkDefinitions } from '@/lib/social-links'

interface FooterProps {
  footerMessages: AppMessages['footer']
  socialMessages: AppMessages['common']['socialLinks']
}

export default function Footer({ footerMessages, socialMessages }: FooterProps) {
  const joinHref = { pathname: '/contact', hash: 'join' } as const
  const quickLinks = [
    { href: '/', label: footerMessages.links.home },
    { href: '/about', label: footerMessages.links.about },
    { href: '/events', label: footerMessages.links.events },
    { href: '/norway', label: footerMessages.links.norway },
    { href: '/contact', label: footerMessages.links.contact },
  ]

  return (
    <footer
      className="text-white/75"
      style={{ backgroundColor: '#1a3a2a' }}
      aria-label={footerMessages.ariaLabel}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1 — Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div
                className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 transition-colors group-hover:border-[#e8b84b]"
                style={{ borderColor: '#c8922a', backgroundColor: 'white' }}
            >
              <Image
                  src="/images/arklogo.jpg"
                  alt={footerMessages.logoAlt}
                  fill
                  sizes="75px"
                  className="object-contain"
              />
            </div>
            <div>
              <div className="font-serif text-white text-xl font-semibold leading-tight">ARK</div>
              <div className="text-[11px] text-[#e8b84b] tracking-widest uppercase">
                {footerMessages.brandSubtitle}
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60 max-w-xs">
            {footerMessages.brandDescription}
          </p>
          <p className="text-xs text-white/40 mt-4">
            {footerMessages.orgNumberLabel}: {siteConfig.contact.orgNumber}
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h3
            className="text-[11px] uppercase tracking-widest mb-5 font-semibold"
            style={{ color: '#e8b84b' }}
          >
            {footerMessages.quickLinks}
          </h3>
          <ul className="space-y-2">
            {quickLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-white/65 hover:text-[#e8b84b] transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Contact & Social */}
        <div>
          <h3
            className="text-[11px] uppercase tracking-widest mb-5 font-semibold"
            style={{ color: '#e8b84b' }}
          >
            {footerMessages.getInTouch}
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-white/65 hover:text-[#e8b84b] transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="text-white/65">{footerMessages.contactLocation}</li>
          </ul>

          <Link
            href={joinHref}
            className="inline-flex mt-5 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#c8922a' }}
          >
            {footerMessages.joinArk}
          </Link>

          {/* Social icons */}
          <div className="flex gap-4 mt-6">
            {socialLinkDefinitions.map(({ key, href, iconSrc }) => {
              const social = socialMessages[key]

              return (
              <a
                key={key}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={social.ariaLabel}
                className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <Image
                  src={iconSrc}
                  alt=""
                  width={44}
                  height={44}
                  className="rounded-full"
                  aria-hidden="true"
                />
              </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/35">
          <p>© {new Date().getFullYear()} {footerMessages.rights}</p>
          <p>{footerMessages.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
