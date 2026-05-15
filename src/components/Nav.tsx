'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface NavMessages {
  links: {
    about: string
    events: string
    norway: string
    committee: string
    contact: string
  }
  joinArk: string
  openMenu: string
  closeMenu: string
  homeAria: string
  mainNavigationAria: string
  logoAlt: string
}

interface NavProps {
  navMessages: NavMessages
}

export default function Nav({ navMessages }: NavProps) {
  const pathname = usePathname()
  const [openPathname, setOpenPathname] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const isOpen = openPathname === pathname

  const navLinks = [
    { href: '/about', label: navMessages.links.about },
    { href: '/events', label: navMessages.links.events },
    { href: '/norway', label: navMessages.links.norway },
    { href: '/committee', label: navMessages.links.committee },
    { href: '/contact', label: navMessages.links.contact },
  ]

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-lg' : ''
      }`}
      style={{ backgroundColor: 'rgba(26, 58, 42, 0.97)', backdropFilter: 'blur(8px)' }}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20"
        aria-label={navMessages.mainNavigationAria}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b84b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a2a]"
          aria-label={navMessages.homeAria}
          onClick={() => setOpenPathname(null)}
        >
          <div
            className="relative w-[68px] h-[68px] rounded-full overflow-hidden flex-shrink-0 border-2 transition-colors group-hover:border-[#e8b84b]"
            style={{ borderColor: '#c8922a', backgroundColor: 'white' }}
          >
            <Image
              src="/images/arklogo.jpg"
              alt={navMessages.logoAlt}
              fill
              sizes="75px"
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <div className="font-serif text-white text-xl leading-tight font-semibold">ARK</div>
            <div className="text-xs text-[#e8b84b] leading-tight tracking-widest uppercase">
              kerala.no
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`px-4 py-3 rounded-md text-base font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-[#e8b84b]'
                    : 'text-white/80 hover:text-[#e8b84b] hover:bg-white/5'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b84b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a2a]`}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/contact#join"
            aria-current={pathname === '/contact' ? 'page' : undefined}
            className="ml-3 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-150 hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b84b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a2a]"
            style={{ backgroundColor: '#c8922a', color: '#fff' }}
          >
            {navMessages.joinArk}
          </Link>
          {/*<div className="ml-3">*/}
          {/*  <LanguageSwitcher*/}
          {/*    locale={locale}*/}
          {/*    label={navMessages.languageLabel}*/}
          {/*    shortLabels={navMessages.shortLabels}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b84b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a2a]"
          onClick={() => setOpenPathname((current) => (current === pathname ? null : pathname))}
          aria-label={isOpen ? navMessages.closeMenu : navMessages.openMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">{isOpen ? navMessages.closeMenu : navMessages.openMenu}</span>
          {isOpen ? (
            // X icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            // Hamburger icon
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden px-4 pb-6 pt-2 flex flex-col gap-1"
          style={{ backgroundColor: 'rgba(26, 58, 42, 0.98)' }}
        >
          {/*<div className="mb-3 flex justify-end">*/}
          {/*  <LanguageSwitcher*/}
          {/*    locale={locale}*/}
          {/*    label={navMessages.languageLabel}*/}
          {/*    shortLabels={navMessages.shortLabels}*/}
          {/*    onLocaleChange={() => setOpenPathname(null)}*/}
          {/*  />*/}
          {/*</div>*/}
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpenPathname(null)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive
                    ? 'text-[#e8b84b] bg-white/5'
                    : 'text-white/80 hover:text-[#e8b84b] hover:bg-white/5'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b84b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a2a]`}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/contact#join"
            onClick={() => setOpenPathname(null)}
            aria-current={pathname === '/contact' ? 'page' : undefined}
            className="mt-3 px-4 py-3 rounded-lg text-lg font-semibold text-center transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b84b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a2a]"
            style={{ backgroundColor: '#c8922a', color: '#fff' }}
          >
            {navMessages.joinArk}
          </Link>
        </div>
      )}
    </header>
  )
}
