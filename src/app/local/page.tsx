import type { Metadata } from 'next'
import { generatePageMetadata, siteConfig } from '@/lib/metadata'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export const metadata: Metadata = generatePageMetadata(
  'Kerala Life in Rogaland',
  'Local knowledge for Keralites in Rogaland — Indian grocery stores, Malayalam churches, restaurants, things to do, and community resources.',
  '/local'
)

interface LocalSection {
  icon: string
  title: string
  description: string
  tip?: string
}

const localSections: LocalSection[] = [
  {
    icon: '🛒',
    title: 'Indian Grocery',
    description:
      'For Kerala staples — coconut oil, curry leaves, raw mango, tapioca, matta rice, and spices — head to Bazar Asia or Stavanger Innvandrerbutikk. Both carry a good selection of South Indian and Kerala ingredients. Stock availability varies, so it\'s worth checking both.',
    tip: 'Ask in the ARK group for the latest tips on specific items.',
  },
  {
    icon: '⛪',
    title: 'Malayalam-Speaking Churches',
    description:
      'There are several churches in the Stavanger and Sandnes area with Malayalam services, covering different denominations including Mar Thoma, CSI, Catholic, and Pentecostal congregations. Service times and locations vary — contact ARK and we will connect you with the right community for your denomination.',
    tip: `Contact ${siteConfig.contact.email} with your denomination.`,
  },
  {
    icon: '🍽️',
    title: 'Indian Restaurants',
    description:
      'The Indian dining scene in Stavanger is growing steadily. There are several Indian and South Asian restaurants across the city centre and Sandnes, with varying levels of authenticity and spice tolerance to Norwegian palates. Join the ARK WhatsApp group for current recommendations and community favourites — the list changes as new places open.',
  },
  {
    icon: '🚲',
    title: 'Getting Around',
    description:
      'Stavanger is a compact, very bike-friendly city. Many ARK members cycle year-round — even in winter with proper gear. For longer distances and bad weather days, the Kolumbus bus network is excellent and covers Stavanger, Sandnes, and the surrounding area well. Download the Kolumbus app for real-time schedules and tickets.',
    tip: 'Monthly travel cards offer good value if you commute regularly.',
  },
  {
    icon: '🏔️',
    title: 'Things To Do',
    description:
      'Rogaland is one of Norway\'s most spectacular regions. Must-do experiences include the iconic Preikestolen (Pulpit Rock) hike with its breathtaking view of the Lysefjord, kayaking or boat tours on Lysefjord, a relaxing day at Sola beach in summer, and simply walking around Stavanger\'s beautifully preserved wooden old town (Gamle Stavanger).',
    tip: 'ARK members sometimes organise group hikes — join the community group!',
  },
  {
    icon: '👨‍⚕️',
    title: 'Malayalam-Speaking Doctors',
    description:
      'There are Malayalam-speaking doctors practising in Rogaland. Having a doctor who speaks your language can make a big difference — especially for complex health matters. Ask via the ARK community group and we will connect you with information about who is available and accepting new patients in your area.',
  },
  {
    icon: '📦',
    title: 'Kerala Food Delivery & Online',
    description:
      'Can\'t find something locally? Several Norwegian online stores carry Indian ingredients. For speciality Kerala items, some community members bring supplies back from India. Indian grocery delivery from Oslo-based stores to Rogaland is also possible via various online platforms. Share your tips and discoveries in the ARK group!',
  },
  {
    icon: '💬',
    title: 'ARK WhatsApp Community',
    description:
      'The ARK WhatsApp community group is where much of the daily community life happens — restaurant recommendations, second-hand items, job tips, event announcements, and general malayalee chat. It\'s the fastest way to get a local answer to any question. Contact us to be added to the group.',
    tip: `Email ${siteConfig.contact.email} to join the WhatsApp group.`,
  },
]

export default function LocalPage() {
  return (
    <main className="pt-16">
      {/* Page Hero */}
      <section className="page-hero px-4" aria-label="Local info hero">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: '#c8922a' }}>
            Local Knowledge
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            Kerala Life in Rogaland
          </h1>
          <p className="text-white/65 text-lg mt-4 max-w-2xl leading-relaxed">
            Everything you need to live a little more Kerala while living in Norway.
            Community-sourced, ARK-approved.
          </p>
        </div>
      </section>

      {/* Local sections */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label="Local knowledge sections"
      >
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader
              label="In Rogaland"
              title="Your Kerala guide to Stavanger & Sandnes"
              intro="Local knowledge built up by the ARK community over 15+ years of living here."
            />
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {localSections.map(({ icon, title, description, tip }) => (
                <article
                  key={title}
                  className="card-hover bg-white rounded-2xl p-6 border shadow-sm"
                  style={{ borderColor: '#e8e0d4' }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: 'rgba(26,58,42,0.07)' }}
                      aria-hidden="true"
                    >
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-serif text-xl font-semibold mb-2" style={{ color: '#1a3a2a' }}>
                        {title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                      {tip && (
                        <div
                          className="mt-4 flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs"
                          style={{ backgroundColor: 'rgba(200,146,42,0.08)', color: '#7a5520' }}
                        >
                          <span aria-hidden="true">💡</span>
                          <span>{tip}</span>
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
        style={{ backgroundColor: '#2d5c3e' }}
        aria-label="Join community"
      >
        <div className="max-w-2xl mx-auto">
          <AnimateOnScroll>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white">
              Know something we don&apos;t?
            </h2>
            <p className="text-white/60 mt-3">
              This guide grows with the community. If you have a tip, a recommendation, or a
              correction — let us know!
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-block mt-6 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#c8922a' }}
            >
              Share Your Tip
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
