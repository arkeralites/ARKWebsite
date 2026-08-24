import { messages, type Messages, type TranslationMessages } from '@/lib/messages'

export const locales = ['en', 'no', 'ml'] as const
export type Locale = (typeof locales)[number]
export type AppMessages = TranslationMessages
export const defaultLocale: Locale = 'en'
export const localeCookieName = 'ark-locale'

export const localeDisplayNames: Record<Locale, string> = {
  en: 'English',
  no: 'Norsk',
  ml: 'മലയാളം',
}

export const localeShortNames: Record<Locale, string> = {
  en: 'EN',
  no: 'NO',
  ml: 'ML',
}

export const localeSwitchOrder: readonly Locale[] = ['en', 'ml', 'no']

const localeLanguageTags: Record<Locale, readonly string[]> = {
  en: ['en'],
  no: ['no', 'nb', 'nn'],
  ml: ['ml'],
}

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes((value ?? '') as Locale)
}

export function getMessages(locale: Locale): AppMessages {
  return (messages as Messages)[locale]
}

export function matchPreferredLocale(preferredLanguages: readonly string[]): Locale {
  for (const language of preferredLanguages) {
    const normalized = language.trim().toLowerCase()

    if (!normalized) {
      continue
    }

    for (const locale of locales) {
      const supportedTags = localeLanguageTags[locale]

      if (supportedTags.some((tag) => normalized === tag || normalized.startsWith(`${tag}-`))) {
        return locale
      }
    }
  }

  return defaultLocale
}

export function getOpenGraphLocale(locale: Locale): string {
  switch (locale) {
    case 'no':
      return 'nb_NO'
    case 'ml':
      return 'ml_IN'
    default:
      return 'en_US'
  }
}

export function getDateLocale(locale: Locale): string {
  switch (locale) {
    case 'no':
      return 'nb-NO'
    case 'ml':
      return 'ml-IN'
    default:
      return 'en-GB'
  }
}

