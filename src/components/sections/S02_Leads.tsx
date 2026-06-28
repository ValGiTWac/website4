'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStampLabel } from '@/components/ui/TimeStampLabel'
import { NeonBadge } from '@/components/ui/NeonBadge'
import { GlassCard } from '@/components/ui/GlassCard'
import { LeadScoreBar } from '@/components/ui/LeadScoreBar'
const leads = [{ name: 'Sophie M.', score: 94, source: 'Immoweb' },{ name: 'Thomas B.', score: 81, source: 'Site WHISE' },{ name: 'Marie L.', score: 67, source: 'Zimmo' }]
export function S02_Leads() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.25], [40, 0])
  return (
    <div ref={ref} className="section-overlay" style={{ top: '200vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center items-end px-8 md:px-16 lg:px-24">
        <div className="max-w-lg w-full">
          <TimeStampLabel time="8h00" theme="Lead Treatment — Prioritize" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
            12 leads.<br /><span className="gradient-text">WHISE sait déjà<br />lesquels rappeler.</span>
          </h2>
          <NeonBadge variant="teal" className="mb-6">⚡ Lead Scoring activé</NeonBadge>
          <GlassCard className="flex flex-col gap-4 mt-4">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Score de priorité</span>
            {leads.map((l) => <LeadScoreBar key={l.name} name={l.name} score={l.score} source={l.source} />)}
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
