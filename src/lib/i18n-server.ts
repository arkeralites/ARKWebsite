import { cookies, headers } from 'next/headers'
import {
  defaultLocale,
  getMessages,
  isLocale,
  matchPreferredLocale,
  type AppMessages,
  type Locale,
  localeCookieName,
} from './i18n'

/**
 * Reads the visitor's language preference from their browser/device.
 *
 * Browsers send the languages configured in the operating system, best first,
 * e.g. a phone set to Malayalam sends:
 *   Accept-Language: ml-IN,ml;q=0.9,en-IN;q=0.8,en;q=0.7
 *
 * The optional `q=` value is a preference weight from 0 to 1 (1 when absent).
 * Most browsers already send entries in descending order, but the header does
 * not guarantee it, so sort explicitly. `q=0` means "do not use this language"
 * and is dropped.
 *
 * Note: this reflects the visitor's chosen *display languages*, which is the
 * only language signal a website can see. Installed keyboards and fonts are
 * not visible to a website.
 */
function parseAcceptLanguageHeader(headerValue: string | null): string[] {
  if (!headerValue) {
    return []
  }

  return headerValue
    .split(',')
    .map((part, index) => {
      const [rawTag, ...parameters] = part.trim().split(';')
      const tag = rawTag?.trim() ?? ''

      const qualityParameter = parameters
        .map((parameter) => parameter.trim().toLowerCase())
        .find((parameter) => parameter.startsWith('q='))

      const quality = qualityParameter
        ? Number.parseFloat(qualityParameter.slice(2))
        : 1

      return { tag, quality, index }
    })
    .filter((entry) => entry.tag !== '' && Number.isFinite(entry.quality) && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)
    .map((entry) => entry.tag)
}

/**
 * Decides which language to show, in this order:
 *
 * 1. the `ark-locale` cookie — set only when the visitor picks a language
 *    themselves in the language switcher, and remembered for a year
 * 2. the languages their browser/device asks for (see above)
 * 3. English
 */
export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(localeCookieName)?.value

  if (isLocale(cookieValue)) {
    return cookieValue
  }

  const headerStore = await headers()
  const preferredLanguages = parseAcceptLanguageHeader(headerStore.get('accept-language'))

  if (preferredLanguages.length > 0) {
    return matchPreferredLocale(preferredLanguages)
  }

  return defaultLocale
}

export async function getRequestI18n(): Promise<{ locale: Locale; messages: AppMessages }> {
  const locale = await getCurrentLocale()

  return {
    locale,
    messages: getMessages(locale),
  }
}
