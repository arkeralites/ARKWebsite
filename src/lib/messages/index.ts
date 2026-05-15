import { en } from './en'
import { no } from './no'

export const messages = {
  en,
  no,
} as const

export type Messages = typeof messages
export type { TranslationMessages } from './en'
