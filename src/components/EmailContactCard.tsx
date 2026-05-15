import { siteConfig } from '@/lib/metadata'

interface EmailContactCardProps {
  intro: string
  buttonLabel: string
  directPrefix: string
  subject: string
}

export default function EmailContactCard({
  intro,
  buttonLabel,
  directPrefix,
  subject,
}: EmailContactCardProps) {
  return (
    <div className="text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{ backgroundColor: '#c8922a' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>
      <p className="text-gray-600 leading-relaxed">{intro}</p>
      <a
        href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}`}
        className="inline-flex mt-6 w-full items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-white text-base transition-all hover:opacity-90 active:scale-[0.98]"
        style={{ backgroundColor: '#c8922a' }}
      >
        {buttonLabel}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>
      <p className="mt-4 text-sm text-gray-500">
        {directPrefix}{' '}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline underline-offset-2" style={{ color: '#1a3a2a' }}>
          {siteConfig.contact.email}
        </a>
        .
      </p>
    </div>
  )
}
