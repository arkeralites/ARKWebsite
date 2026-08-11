import type { ReactNode } from 'react'

interface FormattedInlineTextProps {
  text: string
  emphasizePrefixBeforeColon?: boolean
  prefixClassName?: string
  highlightedWords?: string[]
  highlightedWordClassName?: string
}

function escapeForRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function renderHighlightedWords(
  text: string,
  highlightedWords: string[],
  highlightedWordClassName: string
): ReactNode {
  if (highlightedWords.length === 0) {
    return text
  }

  const highlightedWordPattern = new RegExp(
    `(${highlightedWords.map(escapeForRegex).join('|')})`,
    'gi'
  )

  const parts = text.split(highlightedWordPattern)

  if (parts.length === 1) {
    return text
  }

  return parts.map((part, index) => {
    if (!highlightedWords.some((word) => word.toLowerCase() === part.toLowerCase())) {
      return <span key={`${part}-${index}`}>{part}</span>
    }

    return (
      <strong key={`${part}-${index}`} className={highlightedWordClassName}>
        {part}
      </strong>
    )
  })
}

/**
 * Renders a plain message string with two small pieces of inline styling.
 *
 * Message values are PLAIN TEXT, never Markdown — writing `**bold**` in
 * src/lib/messages/*.ts shows literal asterisks on the page.
 *
 * Two behaviours to be aware of:
 *
 * 1. `highlightedWords` defaults to `['naattile']`, so that Malayalam word is
 *    rendered bold-italic automatically EVERYWHERE this component is used —
 *    which includes every SectionHeader intro and every event excerpt. This is
 *    intentional (it is a deliberate stylistic touch), but it is invisible at
 *    the call site. Pass `highlightedWords={[]}` to opt out.
 * 2. With `emphasizePrefixBeforeColon`, everything before the first ":" is
 *    rendered in `prefixClassName`. Used for the "Label: description" style
 *    bullet lists on the About and Committee pages.
 */
export default function FormattedInlineText({
  text,
  emphasizePrefixBeforeColon = false,
  prefixClassName = 'font-semibold',
  highlightedWords = ['naattile'],
  highlightedWordClassName = 'font-semibold italic',
}: FormattedInlineTextProps) {
  const separatorIndex = text.indexOf(':')

  if (emphasizePrefixBeforeColon && separatorIndex !== -1) {
    const prefix = text.slice(0, separatorIndex)
    const description = text.slice(separatorIndex + 1).trimStart()

    return (
      <>
        <span className={prefixClassName}>
          {renderHighlightedWords(prefix, highlightedWords, highlightedWordClassName)}:
        </span>{' '}
        {renderHighlightedWords(description, highlightedWords, highlightedWordClassName)}
      </>
    )
  }

  return renderHighlightedWords(text, highlightedWords, highlightedWordClassName)
}
