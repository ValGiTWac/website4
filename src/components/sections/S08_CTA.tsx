'use client'
import { motion } from 'framer-motion'

export default function S08_CTA() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 text-center relative overflow-hidden holo-grid"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#17BDD5]/10 via-transparent to-[#006AC9]/10 pointer-events-none" />

          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#17BDD5]/5 blur-3xl pointer-events-none"
          />

          <div className="relative z-10">
            <div className="font-mono text-xs text-[#17BDD5] tracking-widest mb-4">// REJOIGNEZ L'AVENIR DE L'IMMOBILIER</div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              Prêt à dominer<br />
              <span className="text-[#17BDD5]">votre marché ?</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Rejoignez 4 200+ agents qui utilisent WHISE pour vendre plus vite,
              mieux, et avec moins d'effort. Démarrez gratuitement dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="px-10 py-4 bg-[#17BDD5] text-[#050A14] font-black rounded-xl hover:bg-white transition-all text-sm tracking-wide"
              >
                Démarrer gratuitement →
              </a>
              <a
                href="mailto:contact@whise.eu"
                className="px-10 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-sm"
              >
                Parler à un expert
              </a>
            </div>
            <p className="text-white/30 text-xs font-mono mt-6">
              Aucune carte bancaire requise · Essai 30 jours · Résiliable à tout moment
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
