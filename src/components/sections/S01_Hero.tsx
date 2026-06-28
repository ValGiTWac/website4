'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function S01_Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#17BDD5] animate-pulse" />
            <span className="font-mono text-xs text-[#17BDD5] tracking-widest">PROPTECH AI · BRUXELLES · DEPUIS 2003</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black text-white mb-4 leading-none tracking-tight"
          >
            L'IA qui{' '}
            <span className="bg-gradient-to-r from-[#17BDD5] to-[#006AC9] bg-clip-text text-transparent">
              révolutionne
            </span>
            <br />l'immobilier belge
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            WHISE connecte 4 200+ agents immobiliers à une intelligence artificielle de pointe.
            Gérez vos leads, visites, négociations et signatures depuis un seul écran.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#pricing"
              className="px-8 py-4 bg-[#17BDD5] text-[#050A14] font-bold rounded-xl hover:bg-[#006AC9] hover:text-white transition-all text-sm tracking-wide"
            >
              Démarrer gratuitement
            </a>
            <a
              href="#features"
              className="px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-sm"
            >
              Découvrir la plateforme
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/30">
            <span className="font-mono text-xs tracking-widest">SCROLL</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-8 bg-gradient-to-b from-[#17BDD5] to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
