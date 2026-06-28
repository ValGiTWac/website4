'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStampLabel } from '@/components/ui/TimeStampLabel'
import { NeonBadge } from '@/components/ui/NeonBadge'
import { CRMWidget } from '@/components/ui/CRMWidget'
export function S04_Drive() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0.1, 0.25], [40, 0])
  return (
    <div ref={ref} className="section-overlay" style={{ top: '600vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center items-end px-8 md:px-16 lg:px-24">
        <div className="max-w-lg w-full">
          <TimeStampLabel time="11h00" theme="Visibility + Market Insights" className="mb-6" />
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ letterSpacing: '-0.03em' }}>
            En route.<br /><span className="gradient-text">Les données sont<br />déjà sur place.</span>
          </h2>
          <NeonBadge variant="blue" className="mb-6">🔗 8 portails synchronisés</NeonBadge>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <CRMWidget label="Prix moyen/m²" value="€3,240" icon="📊" />
            <CRMWidget label="Délai de vente" value="47j" icon="📅" />
            <CRMWidget label="Biens actifs" value="284" icon="🏠" trend="up" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
