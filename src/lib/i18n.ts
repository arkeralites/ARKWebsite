import { messages, type TranslationMessages } from '@/lib/messages'

export const locales = ['en', 'no'] as const
export type Locale = (typeof locales)[number]
export type AppMessages = TranslationMessages
export const defaultLocale: Locale = 'en'
export const localeCookieName = 'ark-locale'

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.includes((value ?? '') as Locale)
}

export function getMessages(locale: Locale): AppMessages {
  return messages[locale]
}


export function getDateLocale(locale: Locale): string {
  switch (locale) {
    case 'no':
      return 'nb-NO'
    default:
      return 'en-GB'
  }
}

