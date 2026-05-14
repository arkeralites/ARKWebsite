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
        'ark-cream':      '#f5f0e8',
        'ark-fjord':      '#3a6b8a',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1a3a2a',
            h1: { fontFamily: 'var(--font-cormorant)', color: '#1a3a2a' },
            h2: { fontFamily: 'var(--font-cormorant)', color: '#1a3a2a' },
            h3: { fontFamily: 'var(--font-cormorant)', color: '#1a3a2a' },
            a: { color: '#c8922a', '&:hover': { color: '#2d5c3e' } },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
