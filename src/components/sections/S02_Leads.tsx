'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStamp } from '@/components/ui/TimeStamp'
import { NeonBadge } from '@/components/ui/NeonBadge'
import { LeadScoreBar } from '@/components/ui/LeadScoreBar'
import { DataStream } from '@/components/ui/DataStream'
const leads = [{ name: 'Sophie M.', score: 94, source: 'Immoweb' },{ name: 'Thomas B.', score: 78, source: 'Site WHISE' },{ name: 'Marie L.', score: 63, source: 'Zimmo' }]
export function S02_Leads() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const opacity = useTransform(scrollYProgress, [0.1,0.22,0.78,0.9], [0,1,1,0])
  const y = useTransform(scrollYProgress, [0.1,0.22], [40,0])
  return (
    <div ref={ref} className="overlay" style={{ top: '200vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center items-end px-8 md:px-16">
        <div className="max-w-md w-full">
          <TimeStamp time="8h00" theme="Lead Treatment — Prioritize" />
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ fontFamily:'var(--font-geist-sans)', letterSpacing:'-0.03em' }}>
            12 leads.<br /><span className="grad">WHISE sait déjà<br />lesquels rappeler.</span>
          </h1>
          <NeonBadge variant="teal" className="mb-5">⚡ Lead Scoring activé</NeonBadge>
          <DataStream />
          <div className="flex flex-col gap-2.5">
            {leads.map((l) => <LeadScoreBar key={l.name} {...l} />)}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
