import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getUpcomingEvents } from '@/lib/events'
import { siteConfig } from '@/lib/metadata'
import EventCard from '@/components/EventCard'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  alternates: { canonical: siteConfig.url },
}

const stats = [
  { value: '2009', label: 'Founded' },
  { value: '3+', label: 'Events / Year' },
  { value: 'Rogaland', label: 'Based in' },
  { value: 'All', label: 'Open to all Keralites' },
]

export default function HomePage() {
  const upcomingEvents = getUpcomingEvents().slice(0, 3)

  return (
    <main>
      {/* ── ARK Banner ─────────────────────────────────────────────────────────── */}
      <section className="pt-16 w-full" aria-label="ARK banner">
        {/* Controlled-height banner: h-40 mobile → h-64 desktop, image cropped to fill */}
        <div className="relative w-full h-44 sm:h-56 md:h-64 lg:h-80">
          <Image
            src="/images/ark-banner.jpg"
            alt="ARK — Association of Rogaland Keralites: Kerala backwaters, cultural performers, and the ARK logo"
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
        aria-label="Hero section"
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
              Association of Rogaland Keralites - Est. 2009
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-tight mb-6">
            Connecting{' '}
            <em className="not-italic" style={{ color: '#e8b84b' }}>
              God&apos;s Own Country
            </em>
            <br />
            to{' '}
            <em className="not-italic" style={{ color: '#e8b84b' }}>
              Fjord&apos;s Own Country
            </em>
          </h1>

          {/* Subtext */}
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            A home away from home for Keralites across Rogaland.
            Culture, community, and a little bit of Kerala — right here in Norway.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#c8922a' }}
            >
              Join the Community
            </Link>
            <Link
              href="/events"
              className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:bg-white/10 active:scale-95 border"
              style={{ color: '#e8b84b', borderColor: '#c8922a' }}
            >
              View Upcoming Events
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <dl className="relative mt-16 w-full max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 px-4">
          {stats.map(({ value, label }) => (
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
        aria-label="Upcoming events preview"
      >
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <SectionHeader
                label="Upcoming Events"
                title="Gather · Celebrate · Connect"
                intro="Join us for our upcoming events across Stavanger and Sandnes."
              />
              <Link
                href="/events"
                className="shrink-0 text-sm font-semibold flex items-center gap-1 hover:underline underline-offset-2"
                style={{ color: '#c8922a' }}
              >
                See all events
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
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            </AnimateOnScroll>
          ) : (
            <AnimateOnScroll>
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg">No upcoming events right now — check back soon!</p>
                <p className="text-sm mt-2">
                  Follow us on{' '}
                  <a
                    href={siteConfig.social.facebookGroupUrl}
                    className="underline"
                    style={{ color: '#c8922a' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>{' '}
                  for the latest updates.
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
        aria-label="About ARK"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <SectionHeader
              label="Who We Are"
              title="A community rooted in Kerala, blossoming in Norway"
              light
            />
            <p className="text-white/65 leading-relaxed mt-6 text-base">
              ARK — Association of Rogaland Keralites — was founded in 2009 by Keralites who
              wanted to keep their culture alive while building a new life in Norway. Today, we
              are a registered organisation bringing together hundreds of Keralites across
              Stavanger, Sandnes, and the wider Rogaland region.
            </p>
            <p className="text-white/65 leading-relaxed mt-4 text-base">
              From Onam feasts to helping newcomers find their footing, ARK is the warm
              community bridge between God&apos;s Own Country and Fjord&apos;s Own Country.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 border"
              style={{ color: '#e8b84b', borderColor: '#e8b84b' }}
            >
              Learn about ARK
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
        aria-label="New to Norway guide teaser"
      >
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader
              label="For Newcomers"
              title="New to Norway? We've got you."
              intro="Moving to a new country is hard. ARK members have been through it. We've put together a practical guide covering healthcare, housing, NAV, schools, banking, and more."
              center
            />
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/norway"
                className="px-8 py-3.5 rounded-xl font-semibold text-white text-base transition-all hover:opacity-90"
                style={{ backgroundColor: '#c8922a' }}
              >
                New to Norway Guide
              </Link>
              <Link
                href="/local"
                className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:bg-gray-100 border border-gray-300"
                style={{ color: '#1a3a2a' }}
              >
                Kerala Life in Rogaland
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
