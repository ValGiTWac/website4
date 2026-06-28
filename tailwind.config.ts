import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'w-blue':    '#006AC9',
        'w-teal':    '#17BDD5',
        'w-navy':    '#0E3A65',
        'w-magenta': '#9E226B',
        'w-red':     '#DC2550',
        'w-dark':    '#050A14',
      },
      fontFamily: {
        display: ['var(--font-geist-sans)', 'sans-serif'],
        mono:    ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
