'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStampLabel } from '@/components/ui/TimeStampLabel'
import { GlassCard } from '@/components/ui/GlassCard'
export function S05_Visit() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.25], [40, 0])
  return (
    <div ref={ref} className="section-overlay" style={{ top: '800vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-lg">
          <TimeStampLabel time="14h00" theme="Lead Treatment — Profiling" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
            Vous connaissez<br /><span className="gradient-text">votre client avant<br />d&apos;ouvrir la porte.</span>
          </h2>
          <GlassCard className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-white">Profil acheteur</span>
              <span className="text-2xl font-mono font-black" style={{ color: '#17BDD5' }}>87%</span>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              {['3 chambres','Jardin','< 350 000 €','Ixelles / Uccle'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-slate-300">
                  <span className="text-emerald-400">✓</span><span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-mono font-bold" style={{ background: 'conic-gradient(#17BDD5 0% 87%, rgba(23,189,213,0.1) 87% 100%)', padding: '3px' }}>
                <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: '#050A14', color: '#17BDD5' }}>87%</div>
              </div>
              <span className="text-xs text-slate-400">Match avec les critères</span>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
