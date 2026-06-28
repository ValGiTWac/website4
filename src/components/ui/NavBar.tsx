'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useWorldStore } from '@/lib/store'
import { ZONES } from '@/lib/zones'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  const scrollToZone = (i: number) => {
    const docH = document.documentElement.scrollHeight - window.innerHeight
    const zones = [0, 0.13, 0.25, 0.38, 0.50, 0.63, 0.75, 0.88]
    window.scrollTo({ top: docH * zones[i], behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      {/* Menu button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-6 z-50 glass px-4 py-2 rounded-lg text-[#17BDD5] font-mono text-xs tracking-widest hover:bg-[#17BDD5]/10 transition-colors"
      >
        {open ? '[ CLOSE ]' : '[ MENU ]'}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-40 w-80 glass border-l border-[#17BDD5]/20 flex flex-col py-20 px-6"
          >
            <div className="font-mono text-xs text-white/40 tracking-widest mb-8">// NAVIGATION</div>
            <nav className="flex flex-col gap-1">
              {ZONES.map((zone, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollToZone(i)}
                  className="text-left px-4 py-3 rounded-lg hover:bg-[#17BDD5]/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-white/30 group-hover:text-[#17BDD5] transition-colors">
                      {String(i).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="text-white text-sm font-medium">{zone.title}</div>
                      <div className="font-mono text-xs text-white/40">{zone.time}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </nav>

            <div className="mt-auto">
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-[#17BDD5] text-[#050A14] font-bold py-3 rounded-xl text-sm hover:bg-[#006AC9] transition-colors"
              >
                Démarrer gratuitement
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
