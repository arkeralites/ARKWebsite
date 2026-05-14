//import Link from 'next/link'
import type { ARKEvent } from '@/lib/events'

interface EventCardProps {
  event: ARKEvent
  muted?: boolean
}

const categoryColors: Record<string, string> = {
  Festival: 'bg-amber-100 text-amber-800',
  Family: 'bg-green-100 text-green-800',
  Celebration: 'bg-blue-100 text-blue-800',
  Cultural: 'bg-purple-100 text-purple-800',
  Community: 'bg-orange-100 text-orange-800',
}

export default function EventCard({ event, muted = false }: EventCardProps) {
  const { title, month, venue, category, excerpt } = event
  const badgeClass = categoryColors[category] ?? 'bg-gray-100 text-gray-700'

  return (
    <article
      className={`card-hover rounded-2xl overflow-hidden border flex flex-col h-full ${
        muted
          ? 'bg-white/60 border-gray-200 opacity-80'
          : 'bg-white border-[#f5f0e8] shadow-sm'
      }`}
    >
      {/* Month banner */}
      <div
        className="px-5 py-3 font-serif text-white text-lg font-semibold"
        style={{ backgroundColor: muted ? '#7a7a7a' : '#c8922a' }}
      >
        {month}
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Category badge */}
        <span className={`inline-block self-start text-xs font-medium rounded-full px-3 py-1 mb-3 ${badgeClass}`}>
          {category}
        </span>

        {/* Title */}
        <h3 className="font-serif text-2xl font-semibold leading-snug mb-2" style={{ color: '#1a3a2a' }}>
          {title}
        </h3>

        {/* Venue */}
        <p className="text-sm mb-3 flex items-center gap-1.5" style={{ color: '#3a6b8a' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {venue}
        </p>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed text-gray-600 flex-1">
          {excerpt}
        </p>

        {/* CTA */}
        {/*<Link*/}
        {/*  href={`/events/${slug}`}*/}
        {/*  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:underline"*/}
        {/*  style={{ color: muted ? '#6b7280' : '#c8922a' }}*/}
        {/*  aria-label={`View details for ${title}`}*/}
        {/*>*/}
        {/*  View details*/}
        {/*  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">*/}
        {/*    <line x1="5" y1="12" x2="19" y2="12"/>*/}
        {/*    <polyline points="12 5 19 12 12 19"/>*/}
        {/*  </svg>*/}
        {/*</Link>*/}
      </div>
    </article>
  )
}
