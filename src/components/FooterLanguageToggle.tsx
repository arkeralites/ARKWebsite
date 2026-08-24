'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import {
  localeCookieName,
  localeDisplayNames,
  localeSwitchOrder,
  localeShortNames,
  type Locale,
} from '@/lib/i18n'

function persistLocaleCookie(locale: Locale) {
  window.document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`
}

interface FooterLanguageToggleProps {
  locale: Locale
  label: string
}

export default function FooterLanguageToggle({ locale, label }: FooterLanguageToggleProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function updateLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return
    }

    persistLocaleCookie(nextLocale)

    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div className="inline-flex items-center gap-2 text-white/45" aria-label={label} role="group">
      {localeSwitchOrder.map((option, index) => {
        const isSelected = option === locale

        return (
          <span key={option} className="inline-flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">·</span>}
            <button
              type="button"
              onClick={() => updateLocale(option)}
              disabled={isPending || isSelected}
              aria-pressed={isSelected}
              aria-label={`${label}: ${localeDisplayNames[option]}`}
              className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b84b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a2a] ${
                isSelected
                  ? 'cursor-default text-white/80'
                  : 'hover:text-[#e8b84b]'
              } ${isPending ? 'cursor-wait opacity-70' : ''}`}
            >
              {localeShortNames[option]}
            </button>
          </span>
        )
      })}
    </div>
  )
}

