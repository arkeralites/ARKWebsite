import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'

export const metadata: Metadata = generatePageMetadata(
  'About ARK',
  'Learn about the Association of Rogaland Keralites — our history, mission, vision, and values since 2009.',
  '/about'
)

const timeline = [
  {
    year: '2009',
    title: 'Founded as Stavanger Keralites',
    description:
      'A small group of Keralites living in Stavanger came together to celebrate Onam and support each other in a new land. The seed of ARK was planted.',
  },
  {
    year: '2014',
    title: 'Renamed to ARK',
    description:
      'As the community grew beyond Stavanger to Sandnes and the wider Rogaland region, the organisation was renamed to Association of Rogaland Keralites — ARK.',
  },
  {
    year: '2019',
    title: 'Registered Organisation',
    description:
      'ARK became an officially registered organisation in Norway (Org.nr: 919 226 447), formalising our commitment to the community.',
  },
  {
    year: 'Today',
    title: 'An Active, Growing Community',
    description:
      'ARK organises multiple events each year, supports newcomers settling in Rogaland, and keeps the culture, language, and spirit of Kerala alive — far from home.',
  },
]

const mission = [
  'Promote and preserve Kerala culture, traditions, language, and arts in Rogaland',
  'Support Keralites newly arrived in Norway through practical guidance and community warmth',
  'Bridge the Kerala community with Norwegian society and foster integration',
  'Undertake charitable and humanitarian projects for those in need',
  'Provide a platform for celebrating festivals, sharing experiences, and building friendships',
]

const values = [
  {
    icon: '🤝',
    title: 'Community',
    description:
      'No one should feel alone in a new country. ARK is built on the simple belief that we are stronger, happier, and more rooted when we come together.',
  },
  {
    icon: '🎭',
    title: 'Culture',
    description:
      'Kerala has one of the world\'s richest cultural traditions. We keep it alive in Rogaland — through food, music, dance, language, and celebration.',
  },
  {
    icon: '🌉',
    title: 'Integration',
    description:
      'We celebrate our roots while embracing Norway. ARK helps members navigate Norwegian society — not as outsiders, but as valued contributors.',
  },
  {
    icon: '🫂',
    title: 'Support',
    description:
      'When you are new, the smallest help makes the biggest difference. ARK members guide, advise, and stand by each other — through good times and tough ones.',
  },
]

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Page Hero */}
      <section className="page-hero text-center px-4" aria-label="About ARK hero">
        <div className="max-w-3xl mx-auto">
          <span
            className="text-xs uppercase tracking-[0.2em] font-semibold"
            style={{ color: '#c8922a' }}
          >
            Our Story
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            Who We Are
          </h1>
          <p className="text-white/65 text-lg mt-4 leading-relaxed">
            A community born from homesickness, shaped by love for Kerala, and rooted in the
            beautiful fjord country of Rogaland.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f5f0e8' }} aria-label="Organisation history">
        <div className="max-w-4xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader
              label="Our Journey"
              title="15 Years of Community"
              intro="From a small gathering over Onam to a registered organisation — the story of ARK."
            />
          </AnimateOnScroll>

          <div className="mt-12 relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5 hidden sm:block"
              style={{ backgroundColor: '#c8922a', opacity: 0.3 }}
              aria-hidden="true"
            />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <AnimateOnScroll key={item.year} delay={i * 100}>
                  <div className="flex gap-6 items-start">
                    {/* Year badge */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2 relative z-10"
                        style={{ backgroundColor: '#1a3a2a', borderColor: '#c8922a' }}
                      >
                        <span className="text-[10px] font-bold text-center leading-none" style={{ color: '#e8b84b' }}>
                          {item.year}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div
                      className="flex-1 rounded-2xl p-6 border bg-white shadow-sm"
                      style={{ borderColor: '#e8e0d4' }}
                    >
                      <h3 className="font-serif text-2xl font-semibold" style={{ color: '#1a3a2a' }}>
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mt-2 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#1a3a2a' }}
        aria-label="ARK mission"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <AnimateOnScroll>
            <SectionHeader
              label="Our Mission"
              title="Why ARK exists"
              light
            />
            <blockquote
              className="mt-6 font-serif text-2xl md:text-3xl italic leading-relaxed"
              style={{ color: '#e8b84b' }}
            >
              &ldquo;To bring together Keralites in Rogaland, preserve our cultural identity,
              and build a life that honours both where we come from and where we are.&rdquo;
            </blockquote>
          </AnimateOnScroll>

          <AnimateOnScroll delay={150}>
            <ul className="space-y-4 mt-8 md:mt-16">
              {mission.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: '#c8922a' }}
                    aria-hidden="true"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                  <span className="text-white/70 leading-relaxed text-base">{item}</span>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Vision */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label="ARK vision"
      >
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: '#c8922a' }}>
              Our Vision
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mt-3 leading-tight" style={{ color: '#1a3a2a' }}>
              What we are building
            </h2>
            <p className="mt-6 text-xl md:text-2xl leading-relaxed italic font-serif" style={{ color: '#2d5c3e' }}>
              A Rogaland where every Keralite feels at home, where our children grow up proud of
              their heritage, where integration and culture walk hand in hand — and where the
              warmth of Kerala is never more than a gathering away.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#2d5c3e' }}
        aria-label="ARK values"
      >
        <div className="max-w-6xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader label="Our Values" title="What guides us" center light />
          </AnimateOnScroll>
          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {values.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl p-6 text-center card-hover"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="text-4xl mb-4" aria-hidden="true">{icon}</div>
                  <h3 className="font-serif text-2xl font-semibold text-white mb-3">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
