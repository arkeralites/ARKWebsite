import Link from 'next/link'
import Image from 'next/image'

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
            <li className="text-white/65">Stavanger &amp; Sandnes, Rogaland, Norway</li>
          </ul>

          {/* Social icons */}
          <div className="flex gap-4 mt-6">
            <a
              href="https://www.facebook.com/groups/773186669487656"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ARK on Facebook"
              className="text-white/50 hover:text-[#e8b84b] transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ark_norway"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ARK on Instagram"
              className="text-white/50 hover:text-[#e8b84b] transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@RogalandKeralites"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ARK on YouTube"
              className="text-white/50 hover:text-[#e8b84b] transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
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
