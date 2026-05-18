import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import {
  formatEventDateForLocale,
  formatEventMonthForLocale,
  getAllEvents,
  getEventBySlug,
  getLocalizedEventCategory,
} from '@/lib/events'
import { generatePageMetadata, siteConfig } from '@/lib/metadata'
import { getRequestI18n } from '@/lib/i18n-server'
import FormattedInlineText from '@/components/FormattedInlineText'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const events = getAllEvents()
  return events.map((event) => ({ slug: event.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await getRequestI18n()
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) return {}
  return generatePageMetadata(event.title, event.excerpt, `/events/${slug}`, locale)
}

const categoryColors: Record<string, string> = {
  Festival: 'bg-amber-100 text-amber-800',
  Family: 'bg-green-100 text-green-800',
  Celebration: 'bg-blue-100 text-blue-800',
  Cultural: 'bg-purple-100 text-purple-800',
  Community: 'bg-orange-100 text-orange-800',
}

export default async function EventDetailPage({ params }: PageProps) {
  const { locale, messages } = await getRequestI18n()
  const { eventDetail, common } = messages
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) notFound()

  const { title, date, venue, category, excerpt, content } = event
  const badgeClass = categoryColors[category] ?? 'bg-gray-100 text-gray-700'
  const month = formatEventMonthForLocale(date, locale)
  const localizedCategory = getLocalizedEventCategory(category, locale, common.categories, common.unknownCategory)

  return (
    <main className="pt-16">
      {/* Event Hero */}
      <section className="page-hero px-4" aria-label={`${eventDetail.heroPrefix}: ${title}`}>
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-[#e8b84b]"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            {eventDetail.allEvents}
          </Link>

          {/* Category + month */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{ backgroundColor: '#c8922a', color: '#fff' }}
            >
              {month}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
              {localizedCategory}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-tight">
            {title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap gap-6 mt-6 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {formatEventDateForLocale(date, locale)}
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {venue}
            </span>
          </div>

          {/* Excerpt */}
          <p className="mt-4 text-white/70 text-lg max-w-2xl leading-relaxed">
            <FormattedInlineText text={excerpt} />
          </p>
        </div>
      </section>

      {/* Event Content */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label={eventDetail.content}
      >
        <div className="max-w-3xl mx-auto">
          <article className="bg-white rounded-2xl shadow-sm border p-8 md:p-12" style={{ borderColor: '#e8e0d4' }}>
            <div className="ark-prose">
              <MDXRemote source={content} />
            </div>
          </article>


          {/* Back + share row */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline underline-offset-2"
              style={{ color: '#c8922a' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
                  {eventDetail.backToAllEvents}
            </Link>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline underline-offset-2"
              style={{ color: '#3a6b8a' }}
            >
              {eventDetail.questionsEmailUs}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
