import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { getRequestI18n } from '@/lib/i18n-server'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getRequestI18n()

  return generatePageMetadata(
    messages.seo.pages.norway.title,
    messages.seo.pages.norway.description,
    '/norway',
    locale
  )
}

export default async function NorwayPage() {
  const { messages } = await getRequestI18n()
  const { norway } = messages

  return (
    <main className="pt-16">
      {/* Page Hero */}
      <section className="page-hero px-4" aria-label={norway.aria.hero}>
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: '#c8922a' }}>
            {norway.heroLabel}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            {norway.heroTitle}
          </h1>
          <p className="text-white/65 text-lg mt-4 max-w-2xl leading-relaxed">
            {norway.heroText}
          </p>
        </div>
      </section>

      {/* Note */}
      <div className="px-4 py-8" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-xl p-5 flex gap-4 items-start border-l-4"
            style={{ backgroundColor: 'rgba(200,146,42,0.08)', borderColor: '#c8922a' }}
            role="note"
          >
            <span className="text-2xl flex-shrink-0" aria-hidden="true">💬</span>
            <div>
              <p className="text-sm leading-relaxed" style={{ color: '#1a3a2a' }}>
                <strong>{norway.noteTitle}</strong> {norway.noteBeforeEmail}{' '}
                <a
                  href="mailto:arkeralites@gmail.com"
                  className="underline font-medium"
                  style={{ color: '#c8922a' }}
                >
                  arkeralites@gmail.com
                </a>
                {' '}{norway.noteAfterEmail}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Guide sections */}
      <section
        className="pb-20 px-4"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label={norway.aria.sections}
      >
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader
              label={norway.sectionLabel}
              title={norway.sectionTitle}
              intro={norway.sectionIntro}
            />
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {norway.sections.map((section) => {
                const links = 'links' in section ? section.links : undefined

                return (
                  <article
                    key={section.title}
                    className="card-hover bg-white rounded-2xl p-6 border shadow-sm"
                    style={{ borderColor: '#e8e0d4' }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: 'rgba(200,146,42,0.1)' }}
                        aria-hidden="true"
                      >
                        {section.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-serif text-xl font-semibold mb-2" style={{ color: '#1a3a2a' }}>
                          {section.title}
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">{section.description}</p>
                        {links && links.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {links.map(({ label, href }) => (
                              <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
                                style={{ backgroundColor: 'rgba(58,107,138,0.1)', color: '#3a6b8a' }}
                              >
                                {label}
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                  <line x1="7" y1="17" x2="17" y2="7"/>
                                  <polyline points="7 7 17 7 17 17"/>
                                </svg>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: '#1a3a2a' }}
        aria-label={norway.aria.cta}
      >
        <div className="max-w-2xl mx-auto">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white">
              {norway.ctaTitle}
            </h2>
            <p className="text-white/60 mt-3">
              {norway.ctaText}
            </p>
            <a
              href="mailto:arkeralites@gmail.com"
              className="inline-block mt-6 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#c8922a' }}
            >
              {norway.ctaButton}
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
