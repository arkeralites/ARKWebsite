import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export const metadata: Metadata = generatePageMetadata(
  'New to Norway',
  'Practical guide for Keralites newly arrived in Rogaland, Norway — healthcare, housing, NAV, banking, schools, and more. Written by ARK members.',
  '/norway'
)

interface GuideSection {
  icon: string
  title: string
  description: string
  links?: { label: string; href: string }[]
}

const guideSections: GuideSection[] = [
  {
    icon: '🏥',
    title: 'Healthcare',
    description:
      'Register with a fastlege (GP/family doctor) via helsenorge.no as soon as you get your D-number or National ID. You are entitled to a fastlege as a registered resident. For urgent non-emergency care outside GP hours, visit the Legevakt. For life-threatening emergencies, call 113.',
    links: [
      { label: 'helsenorge.no', href: 'https://helsenorge.no' },
      { label: 'Stavanger Legevakt', href: 'https://www.stavanger.kommune.no/helse-og-omsorg/legevakt/' },
    ],
  },
  {
    icon: '🏠',
    title: 'Housing',
    description:
      'For renting, the main platform is finn.no — search for "leilighet til leie" (apartment for rent) in Stavanger or Sandnes. Expect to pay 3 months deposit upfront, held in a separate bank account. The standard notice period for leaving is 3 months.',
    links: [{ label: 'finn.no — Rentals', href: 'https://www.finn.no/realestate/lettings/search.html' }],
  },
  {
    icon: '🏛️',
    title: 'NAV — Social Support',
    description:
      'NAV is Norway\'s Labour and Welfare Administration. Register at nav.no when you arrive. If you are newly arrived, ask about integration programmes (Introduksjonsprogrammet). NAV can help with financial support, job seeking, and navigating benefits. Visit your local NAV office in Stavanger or Sandnes.',
    links: [{ label: 'nav.no', href: 'https://www.nav.no' }],
  },
  {
    icon: '🗣️',
    title: 'Norwegian Language',
    description:
      'Free Norwegian language classes (Norskopplæring) are available through your municipality for many visa categories. Contact Stavanger or Sandnes kommune to find out if you are eligible. Learning Norwegian opens many doors — both socially and professionally.',
    links: [
      { label: 'Stavanger Kommune', href: 'https://www.stavanger.kommune.no' },
      { label: 'Sandnes Kommune', href: 'https://www.sandnes.kommune.no' },
    ],
  },
  {
    icon: '💳',
    title: 'D-Number & Bank Account',
    description:
      'You need a D-number (temporary Norwegian ID) before you can open a bank account. Apply for it via Skatteetaten (the Tax Authority) — your employer or the police station can help. Once you have your D-number, DNB and Sparebank 1 SR-Bank are the most commonly used banks among the Rogaland community. Bring your passport, D-number confirmation, and employment documentation.',
    links: [
      { label: 'Skatteetaten', href: 'https://www.skatteetaten.no' },
      { label: 'DNB', href: 'https://www.dnb.no' },
      { label: 'Sparebank 1 SR-Bank', href: 'https://www.srbank.no' },
    ],
  },
  {
    icon: '🏫',
    title: 'Schools & Barnehage',
    description:
      'Children in Norway have the right to attend the local school (skole) in their neighbourhood. Apply through your municipality\'s portal. For barnehage (kindergarten), there is a national application deadline in January/February, but you can apply year-round for available spots.',
    links: [],
  },
  {
    icon: '🚗',
    title: 'Driving Licence',
    description:
      'If you have a driving licence from an EEA country, you can use it in Norway. If your licence is from India or another non-EEA country, you must exchange it for a Norwegian licence within one year of becoming a resident. The process involves a theory test (teoriprøve) and a practical test (oppkjøring). Statens vegvesen handles all licence matters.',
    links: [{ label: 'Statens vegvesen', href: 'https://www.vegvesen.no' }],
  },
  {
    icon: '🚌',
    title: 'Public Transport',
    description:
      'Rogaland\'s public transport is managed by Kolumbus. Download the Kolumbus app to buy tickets, plan routes, and track buses and ferries in real time. A monthly travel card covers all buses in Stavanger and Sandnes. Stavanger is also a very bike-friendly city, with many dedicated bike lanes and rental options.',
    links: [{ label: 'Kolumbus', href: 'https://www.kolumbus.no' }],
  },
]

export default function NorwayPage() {
  return (
    <main className="pt-16">
      {/* Page Hero */}
      <section className="page-hero px-4" aria-label="New to Norway guide hero">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: '#c8922a' }}>
            For Newcomers
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            New to Norway?
          </h1>
          <p className="text-white/65 text-lg mt-4 max-w-2xl leading-relaxed">
            We&apos;ve been where you are. This guide is written by ARK members who have navigated
            the Norwegian system — so you don&apos;t have to figure it out alone.
          </p>
        </div>
      </section>

      {/* Note */}
      <div className="px-4 py-8" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-xl p-5 flex gap-4 items-start border-l-4"
            style={{ backgroundColor: 'rgba(200,146,42,0.08)', borderColor: '#c8922a' }}
            role="note"
          >
            <span className="text-2xl flex-shrink-0" aria-hidden="true">💬</span>
            <div>
              <p className="text-sm leading-relaxed" style={{ color: '#1a3a2a' }}>
                <strong>Written by ARK members who have been through it.</strong> Information here is
                community knowledge — always verify with official sources. Need personal help?
                Contact us at{' '}
                <a
                  href="mailto:arkeralites@gmail.com"
                  className="underline font-medium"
                  style={{ color: '#c8922a' }}
                >
                  arkeralites@gmail.com
                </a>{' '}
                — we&apos;re happy to help!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Guide sections */}
      <section
        className="pb-20 px-4"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label="Settlement guide sections"
      >
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader
              label="Practical Guide"
              title="Getting settled in Rogaland"
              intro="Eight things you need to sort when you arrive — in roughly the right order."
            />
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {guideSections.map(({ icon, title, description, links }) => (
                <article
                  key={title}
                  className="card-hover bg-white rounded-2xl p-6 border shadow-sm"
                  style={{ borderColor: '#e8e0d4' }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: 'rgba(200,146,42,0.1)' }}
                      aria-hidden="true"
                    >
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-serif text-xl font-semibold mb-2" style={{ color: '#1a3a2a' }}>
                        {title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                      {links && links.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {links.map(({ label, href }) => (
                            <a
                              key={label}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
                              style={{ backgroundColor: 'rgba(58,107,138,0.1)', color: '#3a6b8a' }}
                            >
                              {label}
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                                <line x1="7" y1="17" x2="17" y2="7"/>
                                <polyline points="7 7 17 7 17 17"/>
                              </svg>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: '#1a3a2a' }}
        aria-label="Get help from ARK"
      >
        <div className="max-w-2xl mx-auto">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white">
              Still have questions?
            </h2>
            <p className="text-white/60 mt-3">
              ARK members have navigated all of this. Reach out — we genuinely love helping
              newcomers find their feet in Rogaland.
            </p>
            <a
              href="mailto:arkeralites@gmail.com"
              className="inline-block mt-6 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#c8922a' }}
            >
              Email Us
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
