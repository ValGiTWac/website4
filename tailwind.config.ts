import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'whise-blue': '#006AC9',
        'whise-teal': '#17BDD5',
        'whise-navy': '#0E3A65',
        'whise-magenta': '#9E226B',
        'whise-red': '#DC2550',
        'canvas': '#050A14',
      },
      fontFamily: {
        display: ['var(--font-geist-sans)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundImage: {
        'whise-gradient': 'linear-gradient(135deg, #0E3A65, #17BDD5, #9E226B, #DC2550)',
      },
    },
  },
  plugins: [],
}
export default config
