'use client'
import { motion } from 'framer-motion'

const portals = [
  'Immoweb', 'Logic-Immo', 'Athome.lu', 'Funda', 'Seloger', 'Rightmove',
  'Idealista', 'Homegate', 'Immostreet', 'ERA', 'Century 21', 'Remax',
]

export default function S07_Integration() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="font-mono text-xs text-[#17BDD5] tracking-widest mb-3">// RÉSEAU D'INTÉGRATIONS</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Connecté à tout l'écosystème
          </h2>
          <p className="text-white/50">50+ portails, réseaux et outils synchronisés automatiquement.</p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center">
          {portals.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass px-5 py-2 rounded-full text-sm text-white/70 hover:text-[#17BDD5] hover:border-[#17BDD5]/40 transition-all cursor-default"
            >
              {p}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass px-5 py-2 rounded-full text-sm text-[#17BDD5] border border-[#17BDD5]/40"
          >
            + 38 autres
          </motion.div>
        </div>
      </div>
    </section>
  )
}
