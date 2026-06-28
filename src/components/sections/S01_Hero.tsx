'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStampLabel } from '@/components/ui/TimeStampLabel'
import { NeonBadge } from '@/components/ui/NeonBadge'
import { GlassCard } from '@/components/ui/GlassCard'
import { CRMWidget } from '@/components/ui/CRMWidget'
export function S01_Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  return (
    <div ref={ref} className="section-overlay" style={{ top: 0, height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-5xl">
        <TimeStampLabel time="6h45" theme="KPIs & Insights" className="mb-8" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col gap-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none text-white" style={{ letterSpacing: '-0.04em' }}>
            Votre journée<br /><span className="gradient-text">commence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mt-2">WHISE a déjà travaillé pour vous.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8, duration: 0.8 }} className="flex flex-wrap items-center gap-4 mt-8">
          <NeonBadge variant="teal">● 12 nouveaux leads</NeonBadge>
          <NeonBadge variant="blue">Bruxelles · BE</NeonBadge>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2, duration: 1 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-xl">
          <CRMWidget label="Leads ce soir" value="12" icon="📩" trend="up" />
          <CRMWidget label="Score moyen" value="78" icon="⚡" trend="up" />
          <CRMWidget label="Portails actifs" value="8" icon="🔗" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.6, duration: 0.6 }} className="mt-10">
          <button className="px-8 py-3 rounded-xl font-semibold text-white text-sm tracking-wide transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #006AC9, #17BDD5)', boxShadow: '0 0 40px rgba(23,189,213,0.3)' }}>
            Découvrir WHISE →
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
