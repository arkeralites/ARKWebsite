import type { Metadata } from 'next'
import { generatePageMetadata, siteConfig } from '@/lib/metadata'
import { getUpcomingEvents, getPastEvents } from '@/lib/events'
import EventCard from '@/components/EventCard'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export const metadata: Metadata = generatePageMetadata(
  'Events',
  'Upcoming and past events from ARK — Association of Rogaland Keralites. Join us for festivals, celebrations, and community gatherings.',
  '/events'
)

export default function EventsPage() {
  const upcoming = getUpcomingEvents()
  const past = getPastEvents()

  return (
    <main className="pt-16">
      {/* Page Hero */}
      <section className="page-hero px-4 text-center" aria-label="Events hero">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: '#c8922a' }}>
            ARK Events
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            Gather · Celebrate · Connect
          </h1>
          <p className="text-white/65 text-lg mt-4 leading-relaxed">
            From Onam feasts to family days — our events are the heartbeat of the ARK community.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label="Upcoming events"
      >
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader
              label="Coming Up"
              title="What's On"
              intro="Mark your calendar — these events are coming up in the ARK community."
            />
          </AnimateOnScroll>

          {upcoming.length > 0 ? (
            <AnimateOnScroll stagger>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {upcoming.map((event) => (
                  <EventCard key={event.slug} event={event} />
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
                  No upcoming events right now
                </p>
                <p className="text-gray-500 mt-2">
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
                  for the latest announcements.
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
          aria-label="Past events"
        >
          <div className="max-w-6xl mx-auto">
            <AnimateOnScroll>
              <SectionHeader
                label="In the Past"
                title="Where We've Been"
                intro="A look back at ARK's events and celebrations."
              />
            </AnimateOnScroll>
            <AnimateOnScroll stagger>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {past.map((event) => (
                  <EventCard key={event.slug} event={event} muted />
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
        aria-label="Join community"
      >
        <div className="max-w-2xl mx-auto">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white">
              Want to be notified about upcoming events?
            </h2>
            <p className="text-white/60 mt-3">
              Join our WhatsApp community group and follow us on Facebook and Instagram.
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-block mt-6 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#c8922a' }}
            >
              Get in Touch
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
