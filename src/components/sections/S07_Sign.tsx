'use client'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { TimeStampLabel } from '@/components/ui/TimeStampLabel'
import { GlassCard } from '@/components/ui/GlassCard'
export function S07_Sign() {
  const ref = useRef<HTMLDivElement>(null)
  const signRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(signRef, { once: true })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.25], [40, 0])
  useEffect(() => {
    if (!isInView) return
    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({ particleCount: 100, spread: 70, colors: ['#17BDD5','#006AC9','#9E226B','#DC2550'], origin: { y: 0.6 } })
    })
  }, [isInView])
  return (
    <div ref={ref} className="section-overlay" style={{ top: '1200vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div ref={signRef} className="max-w-lg">
          <TimeStampLabel time="18h00" theme="Doc Management" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
            La vente est signée.<br /><span className="gradient-text">WHISE a déjà<br />tout archivé.</span>
          </h2>
          <GlassCard className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl" style={{ color: '#17BDD5' }}>✓</span>
              <div>
                <p className="text-white font-semibold text-sm">Transaction clôturée</p>
                <p className="text-slate-400 text-xs font-mono">47 documents · archivés automatiquement</p>
              </div>
            </div>
            <div className="rounded-xl p-4 border" style={{ borderColor: 'rgba(23,189,213,0.15)', background: 'rgba(23,189,213,0.05)' }}>
              <p className="text-slate-300 text-sm italic leading-relaxed">&ldquo;WHISE m&apos;a fait gagner 2 heures par transaction. Je ne reviens plus en arrière.&rdquo;</p>
              <p className="text-xs font-mono mt-2" style={{ color: '#17BDD5' }}>— Julie V., Agence Horizon Bruxelles</p>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  )
}
