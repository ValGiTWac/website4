'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStamp } from '@/components/ui/TimeStamp'
import { CRMWidget } from '@/components/ui/CRMWidget'
import { TypewriterText } from '@/components/ui/TypewriterText'
import { GlassCard } from '@/components/ui/GlassCard'
export function S03_Calls() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const opacity = useTransform(scrollYProgress, [0.1,0.22,0.78,0.9], [0,1,1,0])
  const y = useTransform(scrollYProgress, [0.1,0.22], [40,0])
  return (
    <div ref={ref} className="overlay" style={{ top: '400vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-md">
          <TimeStamp time="9h30" theme="Lead Treatment — Nurture" />
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6" style={{ fontFamily:'var(--font-geist-sans)', letterSpacing:'-0.03em' }}>
            Pendant que vous parlez,<br /><span className="grad">WHISE prépare la suite.</span>
          </h1>
          <GlassCard className="mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-3">Journal d&apos;appels</span>
            <TypewriterText text="Marie D. — rappelée ✓  ·  Thomas B. — SMS envoyé ✓" speed={40} className="text-sm text-[#17BDD5]" />
          </GlassCard>
          <div className="grid grid-cols-2 gap-3">
            <CRMWidget label="Confirmations auto" value="3" icon="✅" />
            <CRMWidget label="Prochain rappel" value="1h52" icon="⏰" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
