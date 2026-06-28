'use client'
import { motion } from 'framer-motion'

export default function S09_Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10"
        >
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#17BDD5] animate-pulse" />
              <span className="text-[#17BDD5] font-mono font-bold text-lg">WHISE.AI</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Le CRM PropTech leader en Belgique. Connectant agents immobiliers et intelligence artificielle depuis 2003.
            </p>
            <div className="font-mono text-xs text-white/20 mt-4">Bruxelles · Liège · Anvers · Luxembourg</div>
          </div>

          <div>
            <div className="font-mono text-xs text-white/30 tracking-widest mb-4">PRODUIT</div>
            <ul className="space-y-2 text-sm text-white/50">
              {['Fonctionnalités', 'Tarifs', 'Intégrations', 'API Docs', 'Changelog'].map(link => (
                <li key={link}><a href="#" className="hover:text-[#17BDD5] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs text-white/30 tracking-widest mb-4">ENTREPRISE</div>
            <ul className="space-y-2 text-sm text-white/50">
              {['À propos', 'Blog', 'Carrières', 'Contact', 'RGPD'].map(link => (
                <li key={link}><a href="#" className="hover:text-[#17BDD5] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-white/20">
            © 2003–{new Date().getFullYear()} WHISE S.A. · TVA BE0863.290.085
          </div>
          <div className="font-mono text-xs text-white/20">
            Hébergé en UE · ISO 27001 · eIDAS certifié
          </div>
        </div>
      </div>
    </footer>
  )
}
