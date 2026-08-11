import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ark-green-dark': '#1a3a2a',
        'ark-green':      '#2d5c3e',
        'ark-gold':       '#c8922a',
        'ark-gold-light': '#e8b84b',
        // Accessible gold for SMALL TEXT on the cream/white backgrounds.
        // ark-gold only reaches 2.8:1 there, which fails WCAG AA (needs 4.5:1);
        // this one measures 5.2–6.3:1. Keep ark-gold for large headings,
        // borders, icon tints, and button fills.
        'ark-gold-text':  '#7d5915',
        'ark-cream':      '#f5f0e8',
        'ark-fjord':      '#3a6b8a',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'var(--font-noto-sans-malayalam)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'var(--font-noto-sans-malayalam)', 'system-ui', 'sans-serif'],
      },
    },
  },
  // Event body (Markdown) styling lives in the .ark-prose rules in
  // src/app/globals.css — the @tailwindcss/typography plugin is not used.
  plugins: [],
}

export default config
