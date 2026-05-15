import type { Metadata } from 'next'
import Image from 'next/image'
import { generatePageMetadata, siteConfig } from '@/lib/metadata'
import { getRequestI18n } from '@/lib/i18n-server'
import { socialLinkDefinitions } from '@/lib/social-links'
import SectionHeader from '@/components/SectionHeader'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import EmailContactCard from '../../components/EmailContactCard'

export async function generateMetadata(): Promise<Metadata> {
  const { locale, messages } = await getRequestI18n()

  return generatePageMetadata(
    messages.seo.pages.contact.title,
    messages.seo.pages.contact.description,
    '/contact',
    locale
  )
}

export default async function ContactPage() {
  const { messages } = await getRequestI18n()
  const { contact, emailCard, common } = messages

  const contactDetails = [
    {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: contact.detailLabels.email,
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  // {
  //   icon: (
  //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
  //       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  //     </svg>
  //   ),
  //   label: 'Phone',
  //   value: '919 226 447',
  //   href: 'tel:919226447',
  // },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: contact.detailLabels.location,
    value: siteConfig.contact.location,
    href: null,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    label: contact.detailLabels.orgNumber,
    value: siteConfig.contact.orgNumber,
    href: null,
  },
  ]

  return (
    <main className="pt-16">
      {/* Page Hero */}
      <section className="page-hero px-4 text-center" aria-label={contact.aria.hero}>
        <div className="max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: '#c8922a' }}>
            {contact.heroLabel}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-white mt-3 leading-tight">
            {contact.heroTitle}
          </h1>
          <p className="text-white/65 text-lg mt-4 leading-relaxed">
            {contact.heroText}
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: '#f5f0e8' }}
        aria-label={contact.aria.details}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — contact details */}
          <AnimateOnScroll>
            <SectionHeader
              label={contact.sectionLabel}
              title={contact.sectionTitle}
            />

            <ul className="mt-8 space-y-5">
              {contactDetails.map(({ icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(200,146,42,0.1)', color: '#c8922a' }}
                    aria-hidden="true"
                  >
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        className="text-base font-medium transition-colors hover:underline underline-offset-2"
                        style={{ color: '#1a3a2a' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-base font-medium" style={{ color: '#1a3a2a' }}>
                        {value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="mt-10">
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">{contact.followTitle}</h3>
              <div className="flex gap-4">
                {socialLinkDefinitions.map(({ key, href, iconSrc }) => (
                  <a
                    key={key}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={common.socialLinks[key].ariaLabel}
                    className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Image
                      src={iconSrc}
                      alt=""
                      width={44}
                      height={44}
                      className="rounded-xl"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Org info card */}
            <div
              className="mt-10 p-5 rounded-2xl border"
              style={{ backgroundColor: 'rgba(26,58,42,0.04)', borderColor: '#d4c8b4' }}
            >
              <p className="text-sm text-gray-600 leading-relaxed">
                {contact.orgText}
                <br />
                <strong style={{ color: '#1a3a2a' }}>
                  {contact.detailLabels.orgNumber}: {siteConfig.contact.orgNumber}
                </strong>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {contact.memberText}
              </p>
            </div>
          </AnimateOnScroll>

          {/* Right — contact */}
          <AnimateOnScroll delay={150}>
            <div
              className="bg-white rounded-2xl shadow-sm border p-8"
              style={{ borderColor: '#e8e0d4' }}
            >
              <h2 className="font-serif text-2xl font-semibold mb-6" style={{ color: '#1a3a2a' }}>
                {contact.emailUsTitle}
              </h2>
              <EmailContactCard
                intro={emailCard.intro}
                buttonLabel={emailCard.button}
                directPrefix={emailCard.directPrefix}
                subject={emailCard.subject}
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  )
}
