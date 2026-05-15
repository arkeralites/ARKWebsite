'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { localeCookieName, locales, type Locale } from '@/lib/i18n'

function persistLocaleCookie(locale: Locale) {
  window.document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`
}

interface LanguageSwitcherProps {
  locale: Locale
  label: string
  shortLabels: Record<Locale, string>
  onLocaleChange?: (locale: Locale) => void
}

export default function LanguageSwitcher({
  locale,
  label,
  shortLabels,
  onLocaleChange,
}: LanguageSwitcherProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function updateLocale(localeOption: Locale) {
    if (localeOption === locale) return

    onLocaleChange?.(localeOption)
    persistLocaleCookie(localeOption)

    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div className="flex items-center gap-2" aria-label={label}>
      <span className="sr-only">{label}</span>
      <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1">
        {locales.map((option) => {
          const active = option === locale

          return (
            <button
              key={option}
              type="button"
              onClick={() => updateLocale(option)}
              disabled={isPending}
              aria-pressed={active}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
                active
                  ? 'bg-[#c8922a] text-white'
                  : 'bg-white/5 text-white/75 hover:bg-white/10 hover:text-[#e8b84b]'
              } ${isPending ? 'opacity-70' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b84b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a2a]`}
            >
              {shortLabels[option]}
            </button>
          )
        })}
      </div>
    </div>
  )
}

