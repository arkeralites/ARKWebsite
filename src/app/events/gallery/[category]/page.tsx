import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllEventGalleryGroups, getEventGalleryGroupByRouteSegment } from '@/lib/events'
import { generatePageMetadata } from '@/lib/metadata'
import { getRequestI18n } from '@/lib/i18n-server'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import EventGalleryLightbox from '@/components/EventGalleryLightbox'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return getAllEventGalleryGroups().map((group) => ({ category: group.routeSegment }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, messages } = await getRequestI18n()
  const { category } = await params
  const group = getEventGalleryGroupByRouteSegment(category)

  if (!group) {
    return {}
  }

  const title = messages.events.galleryGroups[group.key]

  return generatePageMetadata(title, messages.events.galleryCategoryIntro, `/events/gallery/${category}`, locale)
}

export default async function EventGalleryCategoryPage({ params }: PageProps) {
  const { messages } = await getRequestI18n()
  const { events } = messages
  const { category } = await params
  const group = getEventGalleryGroupByRouteSegment(category)

  if (!group) {
    notFound()
  }

  const groupLabel = events.galleryGroups[group.key]

  return (
    <main className="pt-16">
      <section className="page-hero px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: '#c8922a' }}>
            {events.galleryLabel}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            {groupLabel}
          </h1>
          <p className="text-white/65 text-lg mt-4 leading-relaxed">
            {events.galleryCategoryIntro}
          </p>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: '#ede8e0' }}>
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-2"
              style={{ color: '#7d5915' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              {events.galleryBackToEvents}
            </Link>
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <EventGalleryLightbox
              images={group.images}
              galleryLabel={events.galleryLabel}
              groupLabel={groupLabel}
              closeLabel={events.galleryCloseLabel}
              previousLabel={events.galleryPreviousLabel}
              nextLabel={events.galleryNextLabel}
            />
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}

