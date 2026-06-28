'use client'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "WHISE a transformé notre agence. Nous avons réduit notre temps de traitement des leads de 60% en 3 mois. L'IA de scoring est bluffante.",
    name: "Marie Dubois",
    role: "Directrice, ERA Bruxelles Capital",
    rating: 5,
  },
  {
    quote: "La signature électronique intégrée nous économise 2h par transaction. Sur 30 ventes par mois, c'est énorme. Je ne reviendrai jamais en arrière.",
    name: "Thomas Lecomte",
    role: "Agent indépendant, Liège",
    rating: 5,
  },
  {
    quote: "Enfin un CRM qui comprend le marché immobilier belge. Les connexions avec Immoweb et Logic-Immo fonctionnent parfaitement. Support excellent.",
    name: "Sophie Van der Berg",
    role: "Gérante, Century 21 Anvers",
    rating: 5,
  },
]

export default function S06_Testimonials() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="font-mono text-xs text-[#17BDD5] tracking-widest mb-3">// ILS NOUS FONT CONFIANCE</div>
          <h2 className="text-3xl md:text-4xl font-black text-white">Ce que disent nos agents</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-[#17BDD5] text-sm">★</span>
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-white/40 text-xs">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
