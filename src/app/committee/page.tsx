import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import {
  executiveMembers,
  generalMembers,
  getCommitteeTermLabel,
  getInitials,
  getLocalizedCommitteeRole,
  type CommitteeMember,
} from '@/lib/committee'
import type { Locale } from '@/lib/i18n'
import { getRequestI18n } from '@/lib/i18n-server'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import FormattedInlineText from '@/components/FormattedInlineText'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getRequestI18n()

  return generatePageMetadata(
    messages.seo.pages.committee.title,
    messages.seo.pages.committee.description,
    '/committee',
    locale
  )
}

// Colour pairs for initials avatars — cycles through based on index
const avatarColours = [
  { bg: '#c8922a', text: '#fff' },       // gold
  { bg: '#1a3a2a', text: '#e8b84b' },    // dark green + gold
  { bg: '#2d5c3e', text: '#fff' },       // mid green
  { bg: '#3a6b8a', text: '#fff' },       // fjord blue
  { bg: '#e8b84b', text: '#1a3a2a' },   // light gold
]

function MemberCard({
  member,
  index,
  locale,
  large = false,
}: {
  member: CommitteeMember
  index: number
  locale: Locale
  large?: boolean
}) {
  const colour = avatarColours[index % avatarColours.length]
  const initials = getInitials(member.name)

  return (
    <div
      className={`card-hover bg-white rounded-2xl border flex flex-col items-center text-center shadow-sm ${
        large ? 'p-8' : 'p-6'
      }`}
      style={{ borderColor: '#e8e0d4' }}
    >
      {/* Initials avatar */}
      <div
        className={`rounded-full flex items-center justify-center font-serif font-bold flex-shrink-0 mb-4 ${
          large ? 'w-20 h-20 text-2xl' : 'w-14 h-14 text-lg'
        }`}
        style={{ backgroundColor: colour.bg, color: colour.text }}
        aria-hidden="true"
      >
        {initials}
      </div>

      {/* Name */}
      <h3
        className={`font-serif font-semibold leading-snug ${large ? 'text-2xl' : 'text-xl'}`}
        style={{ color: '#1a3a2a' }}
      >
        {member.name}
      </h3>

      {/* Role */}
      <span
        className="mt-2 text-sm font-medium px-3 py-1 rounded-full"
        style={{ backgroundColor: 'rgba(200,146,42,0.1)', color: '#7d5915' }}
      >
        {getLocalizedCommitteeRole(member.role, locale)}
      </span>
    </div>
  )
}

export default async function CommitteePage() {
  const { messages, locale } = await getRequestI18n()
  const { committee } = messages
  const committeeTermLabel = getCommitteeTermLabel()

  return (
    <main className="pt-16">
      {/* Page Hero */}
      <section className="page-hero px-4 text-center" aria-label={committee.aria.hero}>
        <div className="max-w-3xl mx-auto">
          <span
            className="text-xs uppercase tracking-[0.2em] font-semibold"
            style={{ color: '#c8922a' }}
          >
            {committee.heroLabel}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            {committee.heroTitle}
          </h1>
          <p className="text-white/65 text-lg mt-4 leading-relaxed max-w-2xl mx-auto">
            {committee.heroText}
          </p>
        </div>
      </section>

      {/* Executive Board */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label={committee.aria.executive}
      >
        <div className="max-w-5xl mx-auto">
          <AnimateOnScroll>
            <SectionHeader
              label={committee.executiveLabel}
              title={committee.executiveTitle}
              intro={committee.executiveIntro}
              center
            />
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
              {executiveMembers.map((member, i) => (
                <MemberCard key={member.name} member={member} index={i} locale={locale} large />
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* General Committee */}
      {generalMembers.length > 0 && (
        <section
          className="py-16 px-4"
          style={{ backgroundColor: '#ede8e0' }}
          aria-label={committee.aria.members}
        >
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll>
              <SectionHeader
                  label={committee.membersLabel}
                  title={committee.membersTitle}
                  intro={committee.membersIntro}
                center
              />
              <div className="mt-10 text-center">
                  <span
                      className="font-serif text-2xl md:text-2xl uppercase tracking-[0.2em] font-semibold"
                      style={{ color: '#7d5915' }}
                  >
                    {committee.termPrefix} {committeeTermLabel}
                  </span>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll stagger>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {generalMembers.map((member, i) => (
                  <MemberCard
                    key={member.name}
                    member={member}
                    index={i + executiveMembers.length}
                    locale={locale}
                  />
                ))}
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={150}>
              <div
                className="mt-12 rounded-3xl border bg-white p-8 md:p-10 shadow-sm"
                style={{ borderColor: '#e8e0d4' }}
              >
                <div className="text-center">
                  <h2
                    className="font-serif text-3xl md:text-4xl font-semibold mt-3"
                    style={{ color: '#1a3a2a' }}
                  >
                    {committee.workTitle}
                  </h2>
                </div>

                <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  {committee.highlights.map((item: string) => (
                    <li key={item} className="flex gap-3 items-start">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: '#c8922a' }}
                        aria-hidden="true"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                      <span className="text-gray-700 leading-relaxed">
                        <FormattedInlineText
                          text={item}
                          emphasizePrefixBeforeColon
                          prefixClassName="font-semibold text-[#1a3a2a]"
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      <section className="px-4 py-10" style={{ backgroundColor: '#f5f0e8' }}>
        <div className="max-w-3xl mx-auto">
          <AnimateOnScroll>
            <div
              className="rounded-2xl border px-5 py-5 md:px-6 md:py-6 text-center shadow-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.88)', borderColor: '#d4c8b4' }}
            >
              <p className="mt-4 text-sm md:text-base leading-relaxed" style={{ color: '#5f5f5f' }}>
                {committee.noteText}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/*/!* Deputy Members *!/*/}
      {/*{deputyMembers.length > 0 && (*/}
      {/*  <section*/}
      {/*    className="py-16 px-4"*/}
      {/*    style={{ backgroundColor: '#f5f0e8' }}*/}
      {/*    aria-label="Deputy committee members"*/}
      {/*  >*/}
      {/*    <div className="max-w-3xl mx-auto">*/}
      {/*      <AnimateOnScroll>*/}
      {/*        <SectionHeader*/}
      {/*          label="Substitutes"*/}
      {/*          title="Deputy Members"*/}
      {/*          center*/}
      {/*        />*/}
      {/*      </AnimateOnScroll>*/}

      {/*      <AnimateOnScroll stagger>*/}
      {/*        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">*/}
      {/*          {deputyMembers.map((member, i) => (*/}
      {/*            <MemberCard*/}
      {/*              key={i}*/}
      {/*              member={member}*/}
      {/*              index={i + executiveMembers.length + generalMembers.length}*/}
      {/*            />*/}
      {/*          ))}*/}
      {/*        </div>*/}
      {/*      </AnimateOnScroll>*/}
      {/*    </div>*/}
      {/*  </section>*/}
      {/*)}*/}

      {/* Volunteer CTA */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: '#1a3a2a' }}
        aria-label={committee.aria.cta}
      >
        <div className="max-w-2xl mx-auto">
          <AnimateOnScroll>
            <h2
              className="font-serif text-3xl md:text-4xl font-semibold text-white"
            >
              {committee.ctaTitle}
            </h2>
            <p className="text-white/60 mt-3 leading-relaxed">
              {committee.ctaText}
            </p>
            <Link
              href="/contact"
              className="inline-block mt-6 px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#c8922a' }}
            >
              {committee.ctaButton}
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
