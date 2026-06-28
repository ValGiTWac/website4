'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStamp } from '@/components/ui/TimeStamp'
import { GlassCard } from '@/components/ui/GlassCard'
const steps = [
  { label: 'Offre reçue', done: true },
  { label: 'Compromis généré', done: true },
  { label: 'Notaire contacté', done: false, active: true },
  { label: 'Acte final', done: false },
]
export function S06_Negotiate() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const opacity = useTransform(scrollYProgress, [0.1,0.22,0.78,0.9], [0,1,1,0])
  const y = useTransform(scrollYProgress, [0.1,0.22], [40,0])
  return (
    <div ref={ref} className="overlay" style={{ top: '1000vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center items-end px-8 md:px-16">
        <div className="max-w-md w-full">
          <TimeStamp time="16h30" theme="Streamline Transaction" />
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6" style={{ fontFamily:'var(--font-geist-sans)', letterSpacing:'-0.03em' }}>
            Chaque étape.<br /><span className="grad">Dans l&apos;ordre.<br />Sans rien oublier.</span>
          </h1>
          <GlassCard>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-4">Suivi transaction</span>
            <div className="flex flex-col gap-3">
              {steps.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.18 }} className="flex items-center gap-3">
                  <span className={s.done ? 'text-emerald-400' : s.active ? 'text-yellow-400 animate-pulse' : 'text-slate-600'}>
                    {s.done ? '✓' : s.active ? '⏳' : '○'}
                  </span>
                  <span className={`text-sm ${s.done ? 'text-white' : s.active ? 'text-yellow-200' : 'text-slate-500'}`}>{s.label}</span>
                  {s.done && <span className="ml-auto text-emerald-400/40 text-xs font-mono">OK</span>}
                </motion.div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-5 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg,#006AC9,#17BDD5)' }}
                initial={{ width: 0 }} whileInView={{ width: '50%' }} transition={{ duration: 1.2, ease: 'easeOut' }} />
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
