'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useId, useRef, useState, useTransition } from 'react'
import {
  localeCookieName,
  localeDisplayNames,
  locales,
  type Locale,
} from '@/lib/i18n'

function persistLocaleCookie(locale: Locale) {
  window.document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`
}

interface LanguageSwitcherProps {
  locale: Locale
  label: string
  onLocaleChange?: (locale: Locale) => void
  dropdownDirection?: 'up' | 'down'
}

export default function LanguageSwitcher({
  locale,
  label,
  onLocaleChange,
  dropdownDirection = 'down',
}: LanguageSwitcherProps) {
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

  function updateLocale(localeOption: Locale) {
    setIsOpen(false)

    if (localeOption === locale) return

    onLocaleChange?.(localeOption)
    persistLocaleCookie(localeOption)

    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <label className="flex items-center gap-2 text-sm text-white/85" aria-label={label}>
      <span className="sr-only">{label}</span>
      <div className="relative min-w-36" ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          disabled={isPending}
          aria-label={label}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          className={`flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 py-2 pl-3 pr-3 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b84b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a2a] ${isPending ? 'cursor-wait opacity-70' : ''}`}
        >
          <span>{localeDisplayNames[locale]}</span>
          <svg
            className={`h-4 w-4 text-white/75 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {isOpen && (
          <div
            id={listboxId}
            role="listbox"
            aria-label={label}
            className={`absolute right-0 z-50 w-full overflow-hidden rounded-lg border border-white/10 bg-[#1a3a2a] shadow-lg ${dropdownDirection === 'up' ? 'bottom-full mb-2' : 'mt-2'}`}
          >
            {locales.map((option) => {
              const isSelected = option === locale

              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => updateLocale(option)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#e8b84b] ${
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
    </label>
  )
}

