import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { getRequestI18n } from '@/lib/i18n-server'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import FormattedInlineText from '@/components/FormattedInlineText'

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getRequestI18n()

  return generatePageMetadata(
    messages.seo.pages.about.title,
    messages.seo.pages.about.description,
    '/about',
    locale
  )
}

export default async function AboutPage() {
  const { messages } = await getRequestI18n()
  const { about } = messages

  return (
    <main className="pt-16">
      {/* Page Hero */}
      <section className="page-hero text-center px-4" aria-label={about.aria.hero}>
        <div className="max-w-3xl mx-auto">
          <span
            className="text-xs uppercase tracking-[0.2em] font-semibold"
            style={{ color: '#c8922a' }}
          >
            {about.heroLabel}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            {about.heroTitle}
          </h1>
          <p className="text-white/65 text-lg mt-4 leading-relaxed">
            <FormattedInlineText text={about.heroText} />
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f5f0e8' }} aria-label={about.aria.history}>
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader
              label={about.timelineLabel}
              title={about.timelineTitle}
              intro={about.timelineIntro}
            />
          </AnimateOnScroll>

          <div className="mt-12 relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5 hidden sm:block"
              style={{ backgroundColor: '#c8922a', opacity: 0.3 }}
              aria-hidden="true"
            />

            <div className="space-y-10">
              {about.timeline.map((item, i) => (
                <AnimateOnScroll key={item.year} delay={i * 100}>
                  <div className="flex gap-6 items-start">
                    {/* Year badge */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 relative z-10"
                        style={{ backgroundColor: '#1a3a2a', borderColor: '#c8922a' }}
                      >
                        <span className="text-[10px] font-bold text-center leading-none" style={{ color: '#e8b84b' }}>
                          {item.year}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div
                      className="flex-1 rounded-2xl p-6 border bg-white shadow-sm"
                      style={{ borderColor: '#e8e0d4' }}
                    >
                      <h3 className="font-serif text-2xl font-semibold" style={{ color: '#1a3a2a' }}>
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mt-2 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#1a3a2a' }}
        aria-label={about.aria.mission}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <AnimateOnScroll>
            <SectionHeader
              label={about.missionLabel}
              title={about.missionTitle}
              light
            />
            <blockquote
              className="mt-6 font-serif text-2xl md:text-3xl italic leading-relaxed"
              style={{ color: '#e8b84b' }}
            >
              &ldquo;{about.missionQuote}&rdquo;
            </blockquote>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <ul className="space-y-4 mt-8 md:mt-16">
              {about.missionList.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: '#c8922a' }}
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <span className="text-white/70 leading-relaxed text-base">
                    <FormattedInlineText
                      text={item}
                      emphasizePrefixBeforeColon
                      prefixClassName="font-semibold text-white"
                    />
                  </span>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Vision */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label={about.aria.vision}
      >
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: '#c8922a' }}>
              {about.visionLabel}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 leading-tight" style={{ color: '#1a3a2a' }}>
              {about.visionTitle}
            </h2>
            <p className="mt-6 text-xl md:text-2xl leading-relaxed italic font-serif" style={{ color: '#2d5c3e' }}>
              {about.visionText}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#2d5c3e' }}
        aria-label={about.aria.values}
      >
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader label={about.valuesLabel} title={about.valuesTitle} center light />
          </AnimateOnScroll>
          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {about.values.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6 text-center card-hover"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="text-4xl mb-4" aria-hidden="true">{icon}</div>
                  <h3 className="font-serif text-2xl font-semibold text-white mb-3">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
