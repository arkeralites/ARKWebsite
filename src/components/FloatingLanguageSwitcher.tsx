'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useId, useRef, useState, useTransition } from 'react'
import {
  localeCookieName,
  localeDisplayNames,
  localeSwitchOrder,
  type Locale,
} from '@/lib/i18n'

function persistLocaleCookie(locale: Locale) {
  window.document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`
}

interface FloatingLanguageSwitcherProps {
  locale: Locale
  label: string
}

export default function FloatingLanguageSwitcher({ locale, label }: FloatingLanguageSwitcherProps) {
  const router = useRouter()
  const listboxId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function updateLocale(nextLocale: Locale) {
    setIsOpen(false)

    if (nextLocale === locale) {
      return
    }

    persistLocaleCookie(nextLocale)

    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        disabled={isPending}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1a3a2a] text-xl text-white shadow-lg transition-colors hover:bg-[#234b35] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b84b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f0e8] ${isPending ? 'cursor-wait opacity-70' : ''}`}
      >
        <span aria-hidden="true">🌐</span>
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="absolute bottom-full right-0 mb-2 min-w-40 overflow-hidden rounded-lg border border-white/10 bg-[#1a3a2a] shadow-lg"
        >
          {localeSwitchOrder.map((option) => {
            const isSelected = option === locale

            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => updateLocale(option)}
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#e8b84b] ${
                  isSelected ? 'bg-white/10 text-white' : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{localeDisplayNames[option]}</span>
                {isSelected && (
                  <svg
                    className="h-4 w-4 text-[#e8b84b]"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M4.5 10.5 8 14l7.5-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

