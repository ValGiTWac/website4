'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStamp } from '@/components/ui/TimeStamp'
import { NeonBadge } from '@/components/ui/NeonBadge'
import { GlassCard } from '@/components/ui/GlassCard'
export function S05_Visit() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const opacity = useTransform(scrollYProgress, [0.1,0.22,0.78,0.9], [0,1,1,0])
  const y = useTransform(scrollYProgress, [0.1,0.22], [40,0])
  return (
    <div ref={ref} className="overlay" style={{ top: '800vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-md">
          <TimeStamp time="14h00" theme="Lead Treatment — Profiling" />
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ fontFamily:'var(--font-geist-sans)', letterSpacing:'-0.03em' }}>
            Vous connaissez votre client<br /><span className="grad">avant d&apos;ouvrir la porte.</span>
          </h1>
          <NeonBadge variant="teal" className="mb-5">Profil acheteur WHISE</NeonBadge>
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-white">Profil acheteur</span>
              {/* Match ring */}
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(23,189,213,0.15)" strokeWidth="4" />
                <motion.circle cx="26" cy="26" r="22" fill="none" stroke="#17BDD5" strokeWidth="4"
                  strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 22}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
                  whileInView={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - 0.87) }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  transform="rotate(-90 26 26)"
                />
                <text x="26" y="30" textAnchor="middle" fill="#17BDD5" fontSize="10" fontFamily="monospace" fontWeight="bold">87%</text>
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              {['3 chambres','Jardin','< 350 000 €','Ixelles / Uccle'].map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400 text-xs">✓</span><span>{c}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
