'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorldStore } from '@/lib/store'
import { ZONES } from '@/lib/zones'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } },
}

export default function ZoneOverlay() {
  const { activeZone } = useWorldStore()
  const zone = ZONES[activeZone]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none pb-8 px-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeZone}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="max-w-lg"
        >
          <motion.div variants={itemVariants} className="mb-2">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: zone.accentHex }}>
              {zone.theme}
            </span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white mb-1 leading-tight">
            {zone.title}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/60 text-sm mb-4">
            {zone.subtitle}
          </motion.p>
          <motion.p variants={itemVariants} className="text-white/80 text-base leading-relaxed mb-5 glass px-4 py-3 rounded-xl">
            {zone.description}
          </motion.p>
          <motion.div variants={itemVariants} className="glass px-4 py-3 rounded-xl inline-block">
            <div className="font-mono text-xs text-white/40 mb-1">{zone.kpiLabel}</div>
            <div className="text-2xl font-bold" style={{ color: zone.accentHex }}>{zone.kpiValue}</div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
