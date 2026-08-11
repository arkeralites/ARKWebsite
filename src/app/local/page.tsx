import type { Metadata } from 'next'
import { generatePageMetadata, siteConfig } from '@/lib/metadata'
import { getRequestI18n } from '@/lib/i18n-server'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import type { AppMessages } from '@/lib/i18n'

type LocalSectionItem = AppMessages['local']['sections'][number]

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getRequestI18n()

  return generatePageMetadata(
    messages.seo.pages.local.title,
    messages.seo.pages.local.description,
    '/local',
    locale
  )
}

export default async function LocalPage() {
  const { messages } = await getRequestI18n()
  const { local } = messages

  return (
    <main className="pt-16">
      {/* Page Hero */}
      <section className="page-hero px-4" aria-label={local.aria.hero}>
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: '#c8922a' }}>
            {local.heroLabel}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            {local.heroTitle}
          </h1>
          <p className="text-white/65 text-lg mt-4 max-w-2xl leading-relaxed">
            {local.heroText}
          </p>
        </div>
      </section>

      {/* Local sections */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label={local.aria.sections}
      >
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader
              label={local.sectionLabel}
              title={local.sectionTitle}
              intro={local.sectionIntro}
            />
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {local.sections.map((section: LocalSectionItem) => {
                const tip = 'tip' in section ? section.tip : undefined

                return (
                  <article
                    key={section.title}
                    className="card-hover bg-white rounded-2xl p-6 border shadow-sm"
                    style={{ borderColor: '#e8e0d4' }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ backgroundColor: 'rgba(26,58,42,0.07)' }}
                        aria-hidden="true"
                      >
                        {section.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-serif text-xl font-semibold mb-2" style={{ color: '#1a3a2a' }}>
                          {section.title}
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">{section.description}</p>
                        {tip && (
                          <div
                            className="mt-4 flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs"
                            style={{ backgroundColor: 'rgba(200,146,42,0.08)', color: '#7a5520' }}
                          >
                            <span aria-hidden="true">💡</span>
                            <span>{tip}</span>
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
        style={{ backgroundColor: '#2d5c3e' }}
        aria-label={local.aria.cta}
      >
        <div className="max-w-2xl mx-auto">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white">
              {local.ctaTitle}
            </h2>
            <p className="text-white/60 mt-3">
              {local.ctaText}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-block mt-6 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#c8922a' }}
            >
              {local.ctaButton}
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
