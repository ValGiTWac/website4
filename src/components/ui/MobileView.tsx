'use client'
import { motion } from 'framer-motion'
import { ZONES } from '@/lib/zones'

export default function MobileView() {
  return (
    <div className="md:hidden min-h-screen bg-[#050A14] holo-grid">
      <div className="sticky top-0 z-20 glass px-6 py-4 border-b border-[#17BDD5]/20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#17BDD5] animate-pulse" />
          <span className="text-[#17BDD5] font-mono text-sm font-bold">WHISE.AI</span>
        </div>
      </div>

      <div className="px-5 py-8 space-y-12">
        {ZONES.map((zone, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="font-mono text-xs tracking-widest mb-2 uppercase" style={{ color: zone.accentHex }}>
              {zone.theme}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{zone.title}</h2>
            <p className="text-white/60 text-sm mb-3">{zone.subtitle}</p>
            <p className="text-white/80 text-sm leading-relaxed mb-4">{zone.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono text-xs text-white/40">{zone.kpiLabel}</div>
                <div className="text-xl font-bold" style={{ color: zone.accentHex }}>{zone.kpiValue}</div>
              </div>
              <div className="font-mono text-xs text-white/30">{zone.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
