'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStamp } from '@/components/ui/TimeStamp'
import { GlassCard } from '@/components/ui/GlassCard'
import { CounterNumber } from '@/components/ui/CounterNumber'
import { TypewriterText } from '@/components/ui/TypewriterText'
import { SparkLine } from '@/components/ui/SparkLine'
const kpis = [
  { label: 'Leads',        value: 18, suffix: '',  color: '#17BDD5', data: [5,8,6,12,10,15,18] },
  { label: 'Visites',      value: 4,  suffix: '',  color: '#006AC9', data: [1,2,2,3,2,3,4] },
  { label: 'Transactions', value: 2,  suffix: '',  color: '#9E226B', data: [0,1,0,1,1,1,2] },
  { label: 'Conversion',   value: 34, suffix: '%', color: '#DC2550', data: [20,25,22,28,30,32,34] },
]
export function S08_Dashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const opacity = useTransform(scrollYProgress, [0.1,0.22,0.78,0.9], [0,1,1,0])
  const y = useTransform(scrollYProgress, [0.1,0.22], [40,0])
  return (
    <div ref={ref} className="overlay" style={{ top: '1400vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center items-end px-8 md:px-16">
        <div className="max-w-md w-full">
          <TimeStamp time="20h00" theme="KPIs & Insights — Performance" />
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6" style={{ fontFamily:'var(--font-geist-sans)', letterSpacing:'-0.03em' }}>
            Votre journée<br /><span className="grad">en chiffres.</span>
          </h1>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {kpis.map((k) => (
              <GlassCard key={k.label} className="p-3.5 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{k.label}</span>
                </div>
                <CounterNumber target={k.value} suffix={k.suffix} className="text-2xl text-white" />
                <SparkLine data={k.data} color={k.color} />
              </GlassCard>
            ))}
          </div>
          <GlassCard className="mb-5">
            <span className="text-[10px] font-mono uppercase tracking-widest mb-2 block" style={{ color: 'rgba(23,189,213,0.5)' }}>IA Insight</span>
            <TypewriterText text="Votre meilleur jour de la semaine. Conversion +12% vs lundi." speed={35} className="text-sm text-slate-300" />
          </GlassCard>
          <button className="w-full py-3.5 rounded-xl font-bold text-white text-sm tracking-wide"
            style={{ background:'linear-gradient(135deg,#006AC9,#17BDD5)', boxShadow:'0 0 40px rgba(23,189,213,0.3)' }}>
            Commencez votre journée avec WHISE →
          </button>
        </div>
      </motion.div>
    </div>
  )
}
