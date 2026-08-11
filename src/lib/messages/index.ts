import { en, type TranslationMessages } from './en'
import { ml } from './ml'
import { no } from './no'

export const messages = {
  en,
  ml,
  no,
} as const satisfies Readonly<Record<'en' | 'no' | 'ml', TranslationMessages>>

export type Messages = typeof messages
export type { TranslationMessages } from './en'
