import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'WHISE · PropTech AI — Le CRM Immobilier de Demain',
  description: 'WHISE connecte 4 200+ agents immobiliers belges à une IA de pointe. Leads, visites, négociations, signatures — tout en un.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-BE" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
