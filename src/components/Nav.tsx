'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/norway', label: 'New to Norway' },
  { href: '/committee', label: 'Committee' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none"
          aria-label="ARK — Association of Rogaland Keralites, go to homepage"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-[68px] h-[68px] rounded-full overflow-hidden flex-shrink-0 border-2 transition-colors group-hover:border-[#e8b84b]"
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
                className={`px-4 py-3 rounded-md text-base font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-[#e8b84b]'
                    : 'text-white/80 hover:text-[#e8b84b] hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            className="ml-3 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-150 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#c8922a', color: '#fff' }}
          >
            Join ARK
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
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
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                  isActive
                    ? 'text-[#e8b84b] bg-white/5'
                    : 'text-white/80 hover:text-[#e8b84b] hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-3 px-4 py-3 rounded-lg text-lg font-semibold text-center transition-all hover:opacity-90"
            style={{ backgroundColor: '#c8922a', color: '#fff' }}
          >
            Join ARK
          </Link>
        </div>
      )}
    </header>
  )
}
