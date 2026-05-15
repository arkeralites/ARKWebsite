import { cookies } from 'next/headers'
import { defaultLocale, getMessages, isLocale, type AppMessages, type Locale, localeCookieName } from './i18n'

export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(localeCookieName)?.value

  if (isLocale(cookieValue)) {
    return cookieValue
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

