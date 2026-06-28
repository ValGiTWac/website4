'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorldStore } from '@/lib/store'
import { ZONES } from '@/lib/zones'

export default function HUD() {
  const { activeZone, scrollProgress } = useWorldStore()
  const zone = ZONES[activeZone]

  return (
    <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass px-4 py-2 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#17BDD5] animate-pulse" />
            <span className="text-[#17BDD5] font-mono text-xs tracking-widest">WHISE.AI</span>
            <span className="text-white/30 font-mono text-xs">v4.2.0</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass px-4 py-2 rounded-lg"
        >
          <div className="flex items-center gap-4">
            <span className="text-white/40 font-mono text-xs">{zone.time}</span>
            <div className="w-px h-4 bg-white/20" />
            <AnimatePresence mode="wait">
              <motion.span
                key={activeZone}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[#17BDD5] font-mono text-xs tracking-wider"
              >
                ZONE {String(activeZone).padStart(2, '0')} / 07
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="mx-6 mt-2 h-px bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#17BDD5] to-[#006AC9]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Zone indicator dots */}
      <div className="flex justify-center gap-2 mt-3">
        {ZONES.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === activeZone ? 1.5 : 1,
              opacity: i === activeZone ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
            className="w-1.5 h-1.5 rounded-full bg-[#17BDD5]"
          />
        ))}
      </div>
    </div>
  )
}
