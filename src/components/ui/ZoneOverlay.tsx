'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorldStore } from '@/lib/store'
import { ZONES } from '@/lib/zones'

const textVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' }
  }),
  exit: { opacity: 0, y: -8, filter: 'blur(6px)', transition: { duration: 0.25 } },
}

export default function ZoneOverlay() {
  const { activeZone } = useWorldStore()
  const zone = ZONES[activeZone]

  return (
    <div className="fixed bottom-10 left-6 z-40 pointer-events-none max-w-sm">
      <AnimatePresence mode="wait">
        <motion.div key={activeZone} className="space-y-1">
          <motion.div
            custom={0} variants={textVariants} initial="hidden" animate="visible" exit="exit"
            className="font-mono text-[9px] tracking-[0.3em] uppercase"
            style={{ color: zone.accentHex, opacity: 0.8 }}
          >
            {zone.theme}
          </motion.div>
          <motion.h2
            custom={1} variants={textVariants} initial="hidden" animate="visible" exit="exit"
            className="text-2xl font-black text-white leading-tight"
            style={{ textShadow: `0 0 30px ${zone.accentHex}40` }}
          >
            {zone.title}
          </motion.h2>
          <motion.p
            custom={2} variants={textVariants} initial="hidden" animate="visible" exit="exit"
            className="text-white/40 text-xs"
          >
            {zone.subtitle}
          </motion.p>
          <motion.div
            custom={3} variants={textVariants} initial="hidden" animate="visible" exit="exit"
            className="mt-3 pt-3 border-t border-white/8 flex items-end gap-4"
          >
            <div>
              <div className="font-mono text-[9px] text-white/25 tracking-widest">{zone.kpiLabel}</div>
              <div className="text-xl font-black leading-none mt-0.5" style={{ color: zone.accentHex, textShadow: `0 0 20px ${zone.accentHex}60` }}>
                {zone.kpiValue}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
