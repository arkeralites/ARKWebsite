import Link from 'next/link'
import Image from 'next/image'
import { socialLinks } from '@/lib/social-links'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About ARK' },
  { href: '/events', label: 'Events' },
  { href: '/norway', label: 'New to Norway' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      className="text-white/75"
      style={{ backgroundColor: '#1a3a2a' }}
      aria-label="Site footer"
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
                  alt="ARK logo"
                  fill
                  sizes="75px"
                  className="object-contain"
              />
            </div>
            <div>
              <div className="font-serif text-white text-xl font-semibold leading-tight">ARK</div>
              <div className="text-[11px] text-[#e8b84b] tracking-widest uppercase">
                Association of Rogaland Keralites
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60 max-w-xs">
            Bringing the spirit of God&apos;s Own Country to Fjord&apos;s Own Country since 2009.
            A community of Keralites united in culture, friendship, and support.
          </p>
          <p className="text-xs text-white/40 mt-4">
            Org.nr: 919 226 447
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h3
            className="text-[11px] uppercase tracking-widest mb-5 font-semibold"
            style={{ color: '#e8b84b' }}
          >
            Quick Links
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
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="mailto:arkeralites@gmail.com"
                className="text-white/65 hover:text-[#e8b84b] transition-colors"
              >
                arkeralites@gmail.com
              </a>
            </li>
            <li className="text-white/65">Rogaland, Norway</li>
          </ul>

          {/* Social icons */}
          <div className="flex gap-4 mt-6">
            {socialLinks.map(({ label, href, iconSrc, ariaLabel }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={ariaLabel}
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
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/35">
          <p>© {new Date().getFullYear()} ARK — Association of Rogaland Keralites</p>
          <p>Built with ❤️ for the Kerala community in Rogaland</p>
        </div>
      </div>
    </footer>
  )
}
