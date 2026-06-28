'use client'
import { motion } from 'framer-motion'

const features = [
  { icon: '⚡', title: 'IA Prédictive', desc: 'Algorithmes ML qui prédisent la conversion de chaque lead avec 94% de précision.' },
  { icon: '🔮', title: 'Score Automatique', desc: 'Chaque prospect est scoré en temps réel. Concentrez-vous sur ce qui convertit.' },
  { icon: '🌐', title: 'Multi-canal', desc: 'Email, SMS, WhatsApp, téléphone — tout centralisé dans un seul CRM intelligent.' },
  { icon: '📊', title: 'Analytics Temps Réel', desc: 'Dashboards live, rapports automatiques, prédictions de CA pour votre équipe.' },
  { icon: '🔐', title: 'RGPD Natif', desc: 'Conformité totale, archivage sécurisé, signature électronique certifiée eIDAS.' },
  { icon: '🤝', title: 'Intégrations API', desc: 'Connecté à Immoweb, Logic-Immo, athome.lu, Funda et 50+ portails européens.' },
]

export default function S02_Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="font-mono text-xs text-[#17BDD5] tracking-widest mb-3">// FONCTIONNALITÉS CLÉS</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Tout ce dont vous avez besoin,{' '}
            <span className="text-[#17BDD5]">rien de plus</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Conçu par et pour les agents immobiliers belges. Pas de complexité inutile — que de la puissance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 hover:border-[#17BDD5]/30 transition-all group"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#17BDD5] transition-colors">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
