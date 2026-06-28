'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStampLabel } from '@/components/ui/TimeStampLabel'
import { GlassCard } from '@/components/ui/GlassCard'
import { TypewriterText } from '@/components/ui/TypewriterText'
const callLog = ['Sophie M. — rappelée ✓','Thomas B. — SMS envoyé ✓','Marie L. — confirmation email ✓']
export function S03_Calls() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.25], [40, 0])
  return (
    <div ref={ref} className="section-overlay" style={{ top: '400vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-lg">
          <TimeStampLabel time="9h30" theme="Lead Treatment — Nurture" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
            Pendant que vous parlez,<br /><span className="gradient-text">WHISE prépare la suite.</span>
          </h2>
          <GlassCard className="mt-6">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 block">Journal d&apos;appels</span>
            <div className="flex flex-col gap-3">
              {callLog.map((entry, i) => (
                <motion.div key={entry} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 }} className="flex items-center gap-2 text-sm text-[#17BDD5] font-mono">
                  <TypewriterText text={entry} speed={40} />
                </motion.div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex gap-4">
              <div><span className="text-xs text-slate-500 block">Confirmations auto</span><span className="text-white font-mono font-bold">3</span></div>
              <div><span className="text-xs text-slate-500 block">Prochain rappel</span><span className="font-mono font-bold" style={{ color: '#17BDD5' }}>1h52</span></div>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
