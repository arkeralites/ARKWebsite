import type { ReactNode } from 'react'

interface HighlightedMalayalamTextProps {
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

export default function HighlightedMalayalamText({
  text,
  emphasizePrefixBeforeColon = false,
  prefixClassName = 'font-semibold',
  highlightedWords = ['naattile'],
  highlightedWordClassName = 'font-semibold italic',
}: HighlightedMalayalamTextProps) {
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
