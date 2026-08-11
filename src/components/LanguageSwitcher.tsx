'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { localeCookieName, localeDisplayNames, locales, type Locale } from '@/lib/i18n'

function persistLocaleCookie(locale: Locale) {
  window.document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`
}

interface LanguageSwitcherProps {
  locale: Locale
  label: string
  onLocaleChange?: (locale: Locale) => void
}

export default function LanguageSwitcher({
  locale,
  label,
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
    <label className="flex items-center gap-2 text-sm text-white/85" aria-label={label}>
      <span className="sr-only">{label}</span>
      <div className="relative min-w-36">
        <select
          value={locale}
          onChange={(event) => updateLocale(event.target.value as Locale)}
          disabled={isPending}
          aria-label={label}
          className={`w-full appearance-none rounded-lg border border-white/10 bg-white/5 py-2 pl-3 pr-10 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b84b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a2a] ${isPending ? 'cursor-wait opacity-70' : ''}`}
        >
          {locales.map((option) => (
            <option key={option} value={option} className="text-slate-900">
              {localeDisplayNames[option]}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/75"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
  )
}

