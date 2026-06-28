import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        whise: {
          blue: '#006AC9',
          teal: '#17BDD5',
          navy: '#0E3A65',
          magenta: '#9E226B',
          red: '#DC2550',
          dark: '#050A14',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}
export default config
