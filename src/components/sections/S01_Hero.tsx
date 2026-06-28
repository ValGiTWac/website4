'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStamp } from '@/components/ui/TimeStamp'
import { NeonBadge } from '@/components/ui/NeonBadge'
import { CRMWidget } from '@/components/ui/CRMWidget'
import { CounterNumber } from '@/components/ui/CounterNumber'
export function S01_Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start'] })
  const opacity = useTransform(scrollYProgress, [0,0.65], [1,0])
  const y = useTransform(scrollYProgress, [0,1], [0,-60])
  return (
    <div ref={ref} className="overlay" style={{ top: 0, height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16 max-w-2xl">
        <TimeStamp time="6h45" theme="KPIs & Insights" />
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 1, ease: [0.16,1,0.3,1] }}>
          <NeonBadge variant="teal" className="mb-5">Smart Real Estate CRM</NeonBadge>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-2" style={{ fontFamily:'var(--font-geist-sans)', letterSpacing:'-0.04em' }}>
            Votre journée<br />commence.
          </h1>
          <h2 className="text-3xl md:text-4xl font-black mb-5" style={{ color:'#17BDD5', fontFamily:'var(--font-geist-sans)', letterSpacing:'-0.03em' }}>WHISE aussi.</h2>
          <p className="text-slate-400 text-lg max-w-md mb-8">Chaque matin, votre CRM a déjà travaillé pour vous.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.7, duration: 0.8 }} className="flex flex-col gap-3 max-w-xs mb-8">
          <CRMWidget label="Nouveaux leads" value={<CounterNumber target={12} className="text-2xl text-white" />} icon="📩" trend="up" />
          <CRMWidget label="Rendez-vous confirmés" value="3" icon="📅" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, duration: 0.6 }}>
          <button className="px-7 py-3 rounded-xl font-semibold text-white text-sm tracking-wide transition-all"
            style={{ background:'linear-gradient(135deg,#006AC9,#17BDD5)', boxShadow:'0 0 40px rgba(23,189,213,0.35)' }}>
            Découvrir WHISE →
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
