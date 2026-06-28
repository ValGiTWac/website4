'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/ui/GlassCard'
import { NeonBadge } from '@/components/ui/NeonBadge'

const plans = [
  {
    name: 'Freemium', price: 0, highlight: false, badge: null,
    features: ['1 utilisateur','50 contacts','3 portails','Rapports basiques'],
    cta: 'Commencer gratuitement', ctaStyle: 'secondary',
  },
  {
    name: 'Starter', price: 59, highlight: false, badge: null,
    features: ['5 utilisateurs','Contacts illimités','8 portails','Lead Scoring','Automatisations email/SMS'],
    cta: 'Essayer 14 jours', ctaStyle: 'primary',
  },
  {
    name: 'Expert', price: 89, highlight: true, badge: 'Choix de 90% des agences',
    features: ['Utilisateurs illimités','Contacts illimités','Tous les portails','Lead Scoring avancé','IA Personal Advisor','Gestion documents','Analytics avancés','Support prioritaire'],
    cta: 'Essayer 14 jours', ctaStyle: 'gradient',
  },
]

export function S09_Pricing() {
  const [annual, setAnnual] = useState(true)
  return (
    <section className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-24" style={{ background: '#050A14' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
        <NeonBadge variant="teal" className="mb-4">Tarifs</NeonBadge>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4" style={{ letterSpacing: '-0.04em' }}>
          Commencez votre journée<br /><span className="gradient-text">avec WHISE</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">Par utilisateur · Abonnement annuel · HTVA</p>
        <div className="flex items-center gap-3 mt-6 justify-center">
          <span className={annual ? 'text-slate-500 text-sm' : 'text-white text-sm'}>Mensuel</span>
          <button onClick={() => setAnnual(!annual)} className="w-12 h-6 rounded-full relative transition-colors" style={{ background: annual ? '#17BDD5' : 'rgba(255,255,255,0.1)' }}>
            <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform" style={{ transform: annual ? 'translateX(26px)' : 'translateX(2px)' }} />
          </button>
          <span className={annual ? 'text-white text-sm' : 'text-slate-500 text-sm'}>Annuel <span style={{ color: '#17BDD5' }} className="text-xs">-15%</span></span>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.8 }}>
            <div className={['glass-card p-8 flex flex-col gap-6 h-full relative', plan.highlight ? 'shadow-[0_0_60px_rgba(23,189,213,0.2)]' : ''].join(' ')}
              style={plan.highlight ? { background: 'rgba(6,20,50,0.9)', borderColor: 'rgba(23,189,213,0.4)' } : {}}>
              {plan.badge && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><NeonBadge variant="teal">{plan.badge}</NeonBadge></div>}
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white font-mono">{plan.price === 0 ? 'Gratuit' : `€${plan.price}`}</span>
                  {plan.price > 0 && <span className="text-slate-400 text-sm mb-1">/user/mois</span>}
                </div>
              </div>
              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-slate-300">
                    <span style={{ color: '#17BDD5' }} className="text-xs">✓</span>{feat}
                  </li>
                ))}
              </ul>
              <button
                className={['w-full py-3 rounded-xl font-semibold text-sm transition-all', plan.ctaStyle === 'gradient' ? 'text-white' : plan.ctaStyle === 'primary' ? 'text-white border border-[#006AC9]/50' : 'text-slate-300 border border-white/10'].join(' ')}
                style={plan.ctaStyle === 'gradient' ? { background: 'linear-gradient(135deg, #006AC9, #17BDD5)', boxShadow: '0 0 30px rgba(23,189,213,0.3)' } : plan.ctaStyle === 'primary' ? { background: 'rgba(0,106,201,0.15)' } : { background: 'rgba(255,255,255,0.03)' }}>
                {plan.cta}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
