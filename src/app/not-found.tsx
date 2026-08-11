import Link from 'next/link'
import { getRequestI18n } from '@/lib/i18n-server'

// Shown for any address that does not exist, and by notFound() in
// /events/[slug] and /events/gallery/[category]. Old kerala.no/website/* links
// are redirected in next.config.mjs, but anything else lands here.
export default async function NotFound() {
  const { messages } = await getRequestI18n()
  const { notFound, footer } = messages

  const popularLinks = [
    { href: '/events', label: footer.links.events },
    { href: '/about', label: footer.links.about },
    { href: '/norway', label: footer.links.norway },
    { href: '/contact', label: footer.links.contact },
  ]

  return (
    <main className="pt-16">
      <section className="page-hero px-4 text-center" aria-label={notFound.aria}>
        <div className="max-w-2xl mx-auto">
          <span
            className="text-xs uppercase tracking-[0.2em] font-semibold"
            style={{ color: '#c8922a' }}
          >
            {notFound.label}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            {notFound.title}
          </h1>
          <p className="text-white/70 text-lg mt-4 leading-relaxed">
            {notFound.text}
          </p>
          <Link
            href="/"
            className="inline-block mt-8 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#c8922a' }}
          >
            {notFound.homeCta}
          </Link>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
            {notFound.linksTitle}
          </h2>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {popularLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex items-center rounded-xl border bg-white px-5 py-3 text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5"
                  style={{ borderColor: '#d4c8b4', color: '#7d5915' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
