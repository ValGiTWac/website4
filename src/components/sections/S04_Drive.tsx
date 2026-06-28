'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TimeStamp } from '@/components/ui/TimeStamp'
import { NeonBadge } from '@/components/ui/NeonBadge'
import { CRMWidget } from '@/components/ui/CRMWidget'
import { DataStream } from '@/components/ui/DataStream'
export function S04_Drive() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const opacity = useTransform(scrollYProgress, [0.1,0.22,0.78,0.9], [0,1,1,0])
  const y = useTransform(scrollYProgress, [0.1,0.22], [40,0])
  return (
    <div ref={ref} className="overlay" style={{ top: '600vh', height: '200vh' }}>
      <motion.div style={{ opacity, y }} className="sticky top-0 h-screen flex flex-col justify-center items-end px-8 md:px-16">
        <div className="max-w-md w-full">
          <TimeStamp time="11h00" theme="Visibility + Market Insights" />
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4" style={{ fontFamily:'var(--font-geist-sans)', letterSpacing:'-0.03em' }}>
            En route.<br /><span className="grad">Les données sont<br />déjà sur place.</span>
          </h1>
          <NeonBadge variant="blue" className="mb-4">🔗 8 portails synchronisés</NeonBadge>
          <DataStream />
          <div className="grid grid-cols-1 gap-2.5">
            <CRMWidget label="Prix moyen / m²" value="€ 3 240" icon="📊" trend="up" />
            <CRMWidget label="Délai de vente moyen" value="47 jours" icon="📅" />
            <CRMWidget label="Biens comparables" value="12 actifs" icon="🏠" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
