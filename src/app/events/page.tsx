import type { Metadata } from 'next'
import { generatePageMetadata, siteConfig } from '@/lib/metadata'
import { getRequestI18n } from '@/lib/i18n-server'
import { getUpcomingEvents, getPastEvents } from '@/lib/events'
import EventCard from '@/components/EventCard'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getRequestI18n()

  return generatePageMetadata(
    messages.seo.pages.events.title,
    messages.seo.pages.events.description,
    '/events',
    locale
  )
}

export default async function EventsPage() {
  const { locale, messages } = await getRequestI18n()
  const { events, common } = messages
  const upcoming = getUpcomingEvents()
  const past = getPastEvents()

  return (
    <main className="pt-16">
      {/* Page Hero */}
      <section className="page-hero px-4 text-center" aria-label={events.aria.hero}>
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: '#c8922a' }}>
            {events.heroLabel}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            {events.heroTitle}
          </h1>
          <p className="text-white/65 text-lg mt-4 leading-relaxed">
            {events.heroText}
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label={events.aria.upcoming}
      >
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader
              label={events.upcomingLabel}
              title={events.upcomingTitle}
              intro={events.upcomingIntro}
            />
          </AnimateOnScroll>

          {upcoming.length > 0 ? (
            <AnimateOnScroll stagger>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {upcoming.map((event) => (
                  <EventCard
                    key={event.slug}
                    event={event}
                    locale={locale}
                    categoryLabels={common.categories}
                    categoryFallback={common.unknownCategory}
                  />
                ))}
              </div>
            </AnimateOnScroll>
          ) : (
            <AnimateOnScroll>
              <div
                className="mt-10 text-center py-16 rounded-2xl border"
                style={{ borderColor: '#d4c8b4', backgroundColor: 'white' }}
              >
                <p className="text-2xl font-serif" style={{ color: '#1a3a2a' }}>
                  {events.emptyTitle}
                </p>
                <p className="text-gray-500 mt-2">
                  {events.emptyPrefix}{' '}
                  <a
                    href={siteConfig.social.facebookGroupUrl}
                    className="underline"
                    style={{ color: '#c8922a' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {common.facebook}
                  </a>{' '}
                  {events.emptySuffix}
                </p>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* Past Events */}
      {past.length > 0 && (
        <section
          className="py-20 px-4"
          style={{ backgroundColor: '#ede8e0' }}
          aria-label={events.aria.past}
        >
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <SectionHeader
                label={events.pastLabel}
                title={events.pastTitle}
                intro={events.pastIntro}
              />
            </AnimateOnScroll>
            <AnimateOnScroll stagger>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {past.map((event) => (
                  <EventCard
                    key={event.slug}
                    event={event}
                    locale={locale}
                    muted
                    categoryLabels={common.categories}
                    categoryFallback={common.unknownCategory}
                  />
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: '#1a3a2a' }}
        aria-label={events.aria.cta}
      >
        <div className="max-w-2xl mx-auto">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white">
              {events.ctaTitle}
            </h2>
            <p className="text-white/60 mt-3">
              {events.ctaText}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-block mt-6 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#c8922a' }}
            >
              {events.ctaButton}
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
