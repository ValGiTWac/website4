'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStampLabel } from '@/components/ui/TimeStampLabel'
import { GlassCard } from '@/components/ui/GlassCard'
const steps = [{label:'Offre reçue',done:true},{label:'Compromis généré',done:true},{label:'Notaire contacté',done:false,inProgress:true},{label:'Acte signé',done:false}]
export function S06_Negotiate() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.25], [40, 0])
  return (
    <div ref={ref} className="section-overlay" style={{ top: '1000vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center items-end px-8 md:px-16 lg:px-24">
        <div className="max-w-lg w-full">
          <TimeStampLabel time="16h30" theme="Streamline Transaction" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
            Chaque étape.<br /><span className="gradient-text">Dans l&apos;ordre.<br />Sans rien oublier.</span>
          </h2>
          <GlassCard className="mt-6">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 block">Suivi transaction</span>
            <div className="flex flex-col gap-3">
              {steps.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} className="flex items-center gap-3">
                  <span className={s.done ? 'text-emerald-400' : s.inProgress ? 'text-yellow-400 animate-pulse' : 'text-slate-600'}>{s.done ? '✓' : s.inProgress ? '⏳' : '○'}</span>
                  <span className={s.done ? 'text-white text-sm' : s.inProgress ? 'text-yellow-200 text-sm' : 'text-slate-500 text-sm'}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
