import FormattedInlineText from '@/components/FormattedInlineText'

interface SectionHeaderProps {
  label: string
  title: string
  intro?: string
  center?: boolean
  light?: boolean
}

export default function SectionHeader({
  label,
  title,
  intro,
  center = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      <span
        className="text-xs uppercase tracking-[0.2em] font-semibold"
        style={{ color: '#c8922a' }}
      >
        {label}
      </span>
      <div className={`mt-1 mb-1 ${center ? 'mx-auto' : ''} section-divider`} />
      <h2
        className={`font-serif text-4xl md:text-5xl font-semibold leading-tight mt-3 ${
          light ? 'text-white' : ''
        }`}
        style={light ? {} : { color: '#1a3a2a' }}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 leading-relaxed text-lg ${
            center ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          } ${light ? 'text-white/70' : 'text-gray-600'}`}
        >
          <FormattedInlineText text={intro} />
        </p>
      )}
    </div>
  )
}
