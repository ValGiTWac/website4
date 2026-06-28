'use client'
import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Freemium',
    price: '0',
    period: '/ mois',
    color: '#17BDD5',
    badge: null,
    desc: 'Commencez sans engagement. Découvrez la puissance de WHISE.',
    features: [
      '1 utilisateur',
      'Jusqu\'à 50 biens',
      'CRM basique',
      'Portail Immoweb connecté',
      'Support email',
    ],
    cta: 'Démarrer gratuitement',
    href: '#',
  },
  {
    name: 'Starter',
    price: '59',
    period: '/ mois HTVA',
    color: '#006AC9',
    badge: 'POPULAIRE',
    desc: 'Pour les agents indépendants qui veulent passer à la vitesse supérieure.',
    features: [
      '3 utilisateurs',
      'Biens illimités',
      'IA scoring des leads',
      '5 portails connectés',
      'e-Signature incluse',
      'Analytics avancés',
      'Support chat',
    ],
    cta: 'Essayer 30 jours gratuit',
    href: '#',
  },
  {
    name: 'Expert',
    price: '89',
    period: '/ mois HTVA',
    color: '#9E226B',
    badge: 'RECOMMANDÉ',
    desc: 'Pour les agences qui veulent dominer leur marché avec l\'IA.',
    features: [
      'Utilisateurs illimités',
      'Biens illimités',
      'IA complète (ML + prédictif)',
      '50+ portails connectés',
      'e-Signature avancée',
      'Call center IA intégré',
      'API accès complet',
      'Account manager dédié',
      'Formation & onboarding',
    ],
    cta: 'Contacter les ventes',
    href: '#',
  },
]

export default function S05_Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="font-mono text-xs text-[#17BDD5] tracking-widest mb-3">// TARIFS TRANSPARENTS</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Choisissez votre{' '}
            <span className="text-[#17BDD5]">niveau de puissance</span>
          </h2>
          <p className="text-white/50 text-lg">Sans engagement. Résiliable à tout moment.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-3xl p-8 relative ${plan.badge ? 'border-2' : 'border'}`}
              style={{ borderColor: plan.badge ? plan.color : 'rgba(23,189,213,0.15)' }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full font-mono text-xs font-bold tracking-widest text-white"
                  style={{ background: plan.color }}
                >
                  {plan.badge}
                </div>
              )}
              <div className="font-mono text-xs tracking-widest mb-2" style={{ color: plan.color }}>{plan.name}</div>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-black text-white">€{plan.price}</span>
                <span className="text-white/40 text-sm mb-2">{plan.period}</span>
              </div>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">{plan.desc}</p>

              <ul className="space-y-2 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className="block w-full text-center py-3 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: plan.badge ? plan.color : 'transparent',
                  color: plan.badge ? '#050A14' : plan.color,
                  border: plan.badge ? 'none' : `1px solid ${plan.color}40`,
                }}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-xs font-mono mt-8"
        >
          TVA non incluse · Paiement mensuel ou annuel (−20%) · Données hébergées en UE
        </motion.p>
      </div>
    </section>
  )
}
