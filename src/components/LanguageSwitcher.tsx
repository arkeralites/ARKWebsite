'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { localeCookieName, locales, type Locale } from '@/lib/i18n'

interface LanguageSwitcherProps {
  locale: Locale
  label: string
  shortLabels: Record<Locale, string>
}

export default function LanguageSwitcher({ locale, label, shortLabels }: LanguageSwitcherProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [nextLocale, setNextLocale] = useState<Locale | null>(null)

  useEffect(() => {
    if (!nextLocale || nextLocale === locale) {
      return
    }

    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; samesite=lax`

    startTransition(() => {
      router.refresh()
      setNextLocale(null)
    })
  }, [locale, nextLocale, router, startTransition])

  function updateLocale(localeOption: Locale) {
    if (localeOption === locale) return

    setNextLocale(localeOption)
  }

  return (
    <div className="flex items-center gap-2" aria-label={label}>
      <span className="sr-only">{label}</span>
      <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1">
        {locales.map((option) => {
        const active = option === locale
        const disabled = isPending || nextLocale !== null
        return (
          <button
            key={option}
            type="button"
            onClick={() => updateLocale(option)}
            disabled={disabled}
            aria-pressed={active}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
              active
                ? 'bg-[#c8922a] text-white'
                : 'bg-white/5 text-white/75 hover:bg-white/10 hover:text-[#e8b84b]'
            } ${disabled ? 'opacity-70' : ''}`}
          >
            {shortLabels[option]}
          </button>
        )
        })}
      </div>
    </div>
  )
}

