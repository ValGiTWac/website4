'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorldStore } from '@/lib/store'
import { ZONES } from '@/lib/zones'

export default function HUD() {
  const { activeZone, scrollProgress } = useWorldStore()
  const zone = ZONES[activeZone]

  return (
    <>
      {/* Top-left: minimal identity */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-5 left-6 z-40 pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#17BDD5]" style={{ boxShadow: '0 0 6px #17BDD5' }} />
          <span className="font-mono text-[10px] text-[#17BDD5] tracking-[0.3em] opacity-80">WHISE.AI</span>
        </div>
      </motion.div>

      {/* Top-right: coords / depth indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed top-5 right-6 z-40 pointer-events-none text-right"
      >
        <div className="font-mono text-[9px] text-white/25 tracking-widest">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeZone}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="block"
            >
              SECTOR {String(activeZone).padStart(2,'0')} · {zone.time}
            </motion.span>
          </AnimatePresence>
          <span className="block opacity-50">DEPTH {Math.round(scrollProgress * 560).toString().padStart(4,'0')}m</span>
        </div>
      </motion.div>

      {/* Bottom progress — very subtle thin line */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none h-px bg-white/5">
        <motion.div
          className="h-full"
          style={{
            width: `${scrollProgress * 100}%`,
            background: `linear-gradient(90deg, #17BDD5, #006AC9)`,
            boxShadow: '0 0 8px #17BDD5',
          }}
        />
      </div>

      {/* Zone transition flash */}
      <AnimatePresence>
        {useWorldStore.getState().zoneTransitioning && (
          <motion.div
            initial={{ opacity: 0.15 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-30 pointer-events-none bg-[#17BDD5]"
          />
        )}
      </AnimatePresence>

      {/* Bottom-left zone indicator dots */}
      <div className="fixed bottom-4 left-6 z-40 pointer-events-none flex gap-1.5 items-center">
        {ZONES.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === activeZone ? 1.8 : 1,
              opacity: i === activeZone ? 1 : 0.2,
              backgroundColor: i === activeZone ? '#17BDD5' : '#ffffff',
            }}
            transition={{ duration: 0.4 }}
            className="w-1 h-1 rounded-full bg-white"
          />
        ))}
      </div>
    </>
  )
}
