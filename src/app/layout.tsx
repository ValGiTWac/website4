import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'WHISE — Smart Real Estate CRM · Brussels',
  description: 'Le CRM immobilier intelligent qui transforme chaque journée de vos agents.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-BE" className={[GeistSans.variable, GeistMono.variable].join(' ')} style={{ background: '#050A14' }}>
      <body style={{ background: '#050A14', overflowX: 'hidden' }}>{children}</body>
    </html>
  )
}
