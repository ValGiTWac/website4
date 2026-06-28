'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { NeonBadge } from '@/components/ui/NeonBadge'
import { GlassCard } from '@/components/ui/GlassCard'

const plans = [
  {
    name: 'Freemium', price: 0, badge: null, highlight: false, cta: 'Commencer gratuitement', ctaStyle: 'ghost',
    features: ['1 utilisateur','50 contacts','3 portails immobiliers','Rapports basiques'],
  },
  {
    name: 'Starter', price: 59, badge: null, highlight: false, cta: 'Essayer 14 jours', ctaStyle: 'outline',
    features: ['5 utilisateurs','Contacts illimités','8 portails','Lead Scoring','Automatisations email/SMS'],
  },
  {
    name: 'Expert', price: 89, badge: 'Choix de 90% des agences', highlight: true, cta: 'Essayer 14 jours', ctaStyle: 'gradient',
    features: ['Utilisateurs illimités','Contacts illimités','Tous les portails','Lead Scoring avancé','IA Personal Advisor','Gestion de documents','Analytics avancés','Support prioritaire'],
  },
]

export function S09_Pricing() {
  const [annual, setAnnual] = useState(true)
  return (
    <section className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-24" style={{ background: '#050A14' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-12">
        <NeonBadge variant="teal" className="mb-4">Tarifs</NeonBadge>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-3" style={{ fontFamily:'var(--font-geist-sans)', letterSpacing:'-0.04em' }}>
          Commencez votre journée<br /><span className="grad">avec WHISE</span>
        </h2>
        <p className="text-slate-500 text-sm">Par utilisateur · Facturation annuelle · HTVA</p>
        <div className="flex items-center justify-center gap-3 mt-5">
          <span className={`text-sm ${!annual ? 'text-white' : 'text-slate-500'}`}>Mensuel</span>
          <button onClick={() => setAnnual(!annual)} className="w-11 h-6 rounded-full relative transition-colors" style={{ background: annual ? '#17BDD5' : 'rgba(255,255,255,0.1)' }}>
            <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform" style={{ transform: annual ? 'translateX(22px)' : 'translateX(2px)' }} />
          </button>
          <span className={`text-sm ${annual ? 'text-white' : 'text-slate-500'}`}>
            Annuel <span style={{ color: '#17BDD5' }} className="text-xs font-mono">2 mois offerts</span>
          </span>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl">
        {plans.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, duration: 0.8 }} viewport={{ once: true }}>
            <div className={`glass h-full flex flex-col p-7 relative ${p.highlight ? 'shadow-[0_0_80px_rgba(23,189,213,0.2)]' : ''}`}
              style={p.highlight ? { borderColor: 'rgba(23,189,213,0.35)', background: 'rgba(4,12,30,0.9)' } : {}}>
              {p.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap"><NeonBadge variant="teal">{p.badge}</NeonBadge></div>}
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-white mb-1">{p.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white font-mono">{p.price === 0 ? 'Gratuit' : `€ ${p.price}`}</span>
                  {p.price > 0 && <span className="text-slate-400 text-sm mb-1">/user/mois</span>}
                </div>
              </div>
              <ul className="flex flex-col gap-2 flex-1 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span style={{ color:'#17BDD5' }} className="text-xs mt-0.5 shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${p.ctaStyle === 'gradient' ? 'text-white' : p.ctaStyle === 'outline' ? 'text-white border border-[#006AC9]/50 hover:border-[#006AC9]' : 'text-slate-400 border border-white/10 hover:border-white/20'}`}
                style={p.ctaStyle === 'gradient' ? { background:'linear-gradient(135deg,#006AC9,#17BDD5)', boxShadow:'0 0 30px rgba(23,189,213,0.25)' } : p.ctaStyle === 'outline' ? { background:'rgba(0,106,201,0.12)' } : { background:'rgba(255,255,255,0.03)' }}>
                {p.cta}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
