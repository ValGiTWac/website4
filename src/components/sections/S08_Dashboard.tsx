'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStampLabel } from '@/components/ui/TimeStampLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import { CounterNumber } from '@/components/ui/CounterNumber'
import { TypewriterText } from '@/components/ui/TypewriterText'
const kpis = [{label:'Leads',value:18,suffix:'',icon:'📩'},{label:'Visites',value:4,suffix:'',icon:'🏠'},{label:'Transactions',value:2,suffix:'',icon:'📋'},{label:'Conversion',value:34,suffix:'%',icon:'⚡'}]
export function S08_Dashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.25], [40, 0])
  return (
    <div ref={ref} className="section-overlay" style={{ top: '1400vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center items-end px-8 md:px-16 lg:px-24">
        <div className="max-w-lg w-full">
          <TimeStampLabel time="20h00" theme="KPIs & Insights — Performance" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
            Votre journée<br /><span className="gradient-text">en chiffres.</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {kpis.map((k) => (
              <GlassCard key={k.label} className="flex flex-col gap-1 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono uppercase">{k.label}</span><span>{k.icon}</span>
                </div>
                <CounterNumber target={k.value} suffix={k.suffix} className="text-3xl text-white" />
              </GlassCard>
            ))}
          </div>
          <GlassCard>
            <span className="text-xs font-mono uppercase tracking-widest mb-2 block" style={{ color: 'rgba(23,189,213,0.6)' }}>IA Insight</span>
            <TypewriterText text="Votre meilleur jour de la semaine. Conversion +12% vs lundi." speed={35} className="text-sm text-slate-300" />
          </GlassCard>
          <motion.div className="mt-6" whileHover={{ scale: 1.02 }}>
            <button className="w-full py-4 rounded-xl font-bold text-white text-base tracking-wide"
              style={{ background: 'linear-gradient(135deg, #006AC9, #17BDD5)', boxShadow: '0 0 40px rgba(23,189,213,0.3)' }}>
              Commencez votre journée avec WHISE →
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
