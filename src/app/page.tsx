import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedUpcomingEvents } from '@/lib/events'
import { generatePageMetadata, siteConfig } from '@/lib/metadata'
import { getRequestI18n } from '@/lib/i18n-server'
import type { AppMessages } from '@/lib/i18n'
import EventCard from '@/components/EventCard'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'

type HomeStatItem = AppMessages['home']['stats'][number]

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getRequestI18n()

  return generatePageMetadata(
    messages.seo.pages.home.title,
    messages.seo.pages.home.description,
    '/',
    locale
  )
}

export default async function HomePage() {
  const { locale, messages } = await getRequestI18n()
  const { home, common } = messages
  const upcomingEvents = getFeaturedUpcomingEvents(3)
  const stats = home.stats
  const joinHref = { pathname: '/contact', hash: 'join' } as const

  return (
    <main>
      {/* ── ARK Banner ─────────────────────────────────────────────────────────── */}
      <section className="pt-16 w-full" aria-label={home.aria.banner}>
        {/* Controlled-height banner: h-40 mobile → h-64 desktop, image cropped to fill */}
        <div className="relative w-full h-44 sm:h-56 md:h-64 lg:h-80">
          <Image
            src="/images/ark-banner.jpg"
            alt={home.bannerAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ── Hero ───────────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-20"
        style={{ backgroundColor: '#1a3a2a' }}
        aria-label={home.aria.hero}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Pill tag */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] border"
              style={{ color: '#e8b84b', borderColor: '#c8922a', backgroundColor: 'rgba(200,146,42,0.12)' }}
            >
              {home.heroTag}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[0.95] mb-6">
            <span className="block">{home.heroTitleTop}</span>
            <em className="block not-italic" style={{ color: '#e8b84b' }}>
              {home.heroHighlightTop}
            </em>
            <span className="block">{home.heroConnector}</span>
            <em className="block not-italic" style={{ color: '#e8b84b' }}>
              {home.heroTitleBottom}
            </em>
          </h1>

          {/* Subtext */}
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            {home.heroText}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={joinHref}
              className="px-8 py-3.5 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#c8922a' }}
            >
              {home.joinCommunity}
            </Link>
            <Link
              href="/events"
              className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:bg-white/10 active:scale-95 border"
              style={{ color: '#e8b84b', borderColor: '#c8922a' }}
            >
              {home.viewUpcomingEvents}
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <dl className="relative mt-16 w-full max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 px-4">
          {stats.map(({ value, label }: HomeStatItem) => (
            <div key={label} className="flex flex-col-reverse items-center text-center">
              <dt className="text-white/55 text-xs mt-1 uppercase tracking-wider">{label}</dt>
              <dd
                className="font-serif text-3xl md:text-4xl font-semibold"
                style={{ color: '#e8b84b' }}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </section>

      {/* ── Upcoming Events Preview ─────────────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label={home.aria.upcoming}
      >
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <SectionHeader
                label={home.upcoming.label}
                title={home.upcoming.title}
                intro={home.upcoming.intro}
              />
              <Link
                href="/events"
                className="shrink-0 text-sm font-semibold flex items-center gap-1 hover:underline underline-offset-2"
                style={{ color: '#7d5915' }}
              >
                {home.upcoming.seeAll}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          </AnimateOnScroll>

          {upcomingEvents.length > 0 ? (
            <AnimateOnScroll stagger>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.slug}
                    event={event}
                    locale={locale}
                    categoryLabels={common.categories}
                    categoryFallback={common.unknownCategory}
                    viewDetailsLabel={common.viewDetails}
                  />
                ))}
              </div>
            </AnimateOnScroll>
          ) : (
            <AnimateOnScroll>
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg">{home.upcoming.emptyTitle}</p>
                <p className="text-sm mt-2">
                  {home.upcoming.emptyPrefix}{' '}
                  <a
                    href={siteConfig.social.facebookGroupUrl}
                    className="underline"
                    style={{ color: '#7d5915' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {common.facebook}
                  </a>{' '}
                  {home.upcoming.emptySuffix}
                </p>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>

      {/* ── About Teaser ────────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#2d5c3e' }}
        aria-label={home.aria.about}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <SectionHeader
                label={home.about.label}
                title={home.about.title}
              light
            />
            <p className="text-white/65 leading-relaxed mt-6 text-base">
              {home.about.paragraph1}
            </p>
            <p className="text-white/65 leading-relaxed mt-4 text-base">
              {home.about.paragraph2}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 border"
              style={{ color: '#e8b84b', borderColor: '#e8b84b' }}
            >
              {home.about.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </AnimateOnScroll>

          {/* Decorative element */}
          <AnimateOnScroll delay={150}>
            <div className="flex justify-center">
              <div
                className="relative w-64 h-64 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(200, 146, 42, 0.1)', border: '2px solid rgba(200,146,42,0.3)' }}
                aria-hidden="true"
              >
                <div
                  className="absolute w-48 h-48 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(200, 146, 42, 0.12)', border: '2px solid rgba(200,146,42,0.4)' }}
                >
                  <div
                    className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(200, 146, 42, 0.15)', border: '2px solid rgba(200,146,42,0.5)' }}
                  >
                    <span className="font-serif text-5xl font-bold" style={{ color: '#e8b84b' }}>ARK</span>
                    {/*<Image*/}
                    {/*    src="/images/arklogo.jpg"*/}
                    {/*    alt="ARK logo"*/}
                    {/*    width={128}*/}
                    {/*    height={128}*/}
                    {/*    className="w-full h-full rounded-full object-cover flex-shrink-0 border-2 transition-colors group-hover:border-[#e8b84b]"*/}
                    {/*/>*/}
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── New to Norway Teaser ─────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 text-center"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label={home.aria.newcomers}
      >
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader
                label={home.newcomers.label}
                title={home.newcomers.title}
                intro={home.newcomers.intro}
              center
            />
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/norway"
                className="px-8 py-3.5 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
                style={{ backgroundColor: '#c8922a' }}
              >
                {home.newcomers.guide}
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
