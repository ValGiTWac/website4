'use client'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { TimeStamp } from '@/components/ui/TimeStamp'
import { GlassCard } from '@/components/ui/GlassCard'
export function S07_Sign() {
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(triggerRef, { once: true })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const opacity = useTransform(scrollYProgress, [0.1,0.22,0.78,0.9], [0,1,1,0])
  const y = useTransform(scrollYProgress, [0.1,0.22], [40,0])
  useEffect(() => {
    if (!inView) return
    import('canvas-confetti').then(({ default: c }) => {
      c({ particleCount: 120, spread: 75, colors: ['#17BDD5','#006AC9','#9E226B','#DC2550'], origin: { y: 0.55 } })
    })
  }, [inView])
  return (
    <div ref={ref} className="overlay" style={{ top: '1200vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16">
        <div ref={triggerRef} className="max-w-md">
          <TimeStamp time="18h00" theme="Doc Management" />
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-2" style={{ fontFamily:'var(--font-geist-sans)', letterSpacing:'-0.04em' }}>
            La vente est signée.
          </h1>
          <h2 className="text-2xl md:text-3xl font-black mb-6" style={{ color:'#17BDD5', fontFamily:'var(--font-geist-sans)', letterSpacing:'-0.03em' }}>
            WHISE a déjà tout archivé.
          </h2>
          <GlassCard className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl text-[#17BDD5]">✓</span>
              <div>
                <p className="text-white font-semibold text-sm">Transaction clôturée</p>
                <p className="text-slate-400 text-xs font-mono">47 documents · archivés automatiquement</p>
              </div>
            </div>
          </GlassCard>
          <GlassCard style={{ borderColor: 'rgba(23,189,213,0.2)', background: 'rgba(5,10,20,0.75)' }}>
            <p className="text-slate-300 text-sm italic leading-relaxed">&ldquo;WHISE m&apos;a fait gagner 2h par transaction. Je ne reviens plus en arrière.&rdquo;</p>
            <p className="font-mono text-xs mt-2" style={{ color: '#17BDD5' }}>— Julie V., Agence Horizon · Bruxelles</p>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
