'use client'
import { motion } from 'framer-motion'
import { ZONES } from '@/lib/zones'

export default function S04_Journey() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="font-mono text-xs text-[#17BDD5] tracking-widest mb-3">// LA JOURNÉE D'UN AGENT WHISE</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            De l'aube au soir,{' '}
            <span className="text-[#17BDD5]">WHISE vous accompagne</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#17BDD5] via-[#006AC9] to-transparent" />

          <div className="space-y-8">
            {ZONES.map((zone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.1 }}
                className="relative pl-20"
              >
                <div
                  className="absolute left-5 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: zone.accentHex, top: '50%', transform: 'translateY(-50%)' }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: zone.accentHex }} />
                </div>

                <div className="glass rounded-2xl p-5 hover:border-[#17BDD5]/30 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono text-xs tracking-wider mb-1" style={{ color: zone.accentHex }}>
                        {zone.time} · {zone.theme}
                      </div>
                      <h3 className="text-white font-bold text-lg">{zone.title}</h3>
                      <p className="text-white/50 text-sm mt-1 leading-relaxed">{zone.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono text-xs text-white/30">{zone.kpiLabel}</div>
                      <div className="text-xl font-bold" style={{ color: zone.accentHex }}>{zone.kpiValue}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
