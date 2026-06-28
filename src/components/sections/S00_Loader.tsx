'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollStore } from '@/lib/store'
export function Loader() {
  const [visible, setVisible] = useState(true)
  const setLoaded = useScrollStore((s) => s.setLoaded)
  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setLoaded() }, 2200)
    return () => clearTimeout(t)
  }, [setLoaded])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{ background: '#050A14' }}
          exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0E3A65, #17BDD5, #9E226B, #DC2550)' }}>
              <span className="text-white font-bold text-2xl">W</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-white font-black text-3xl tracking-tight">WHISE</span>
              <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(23,189,213,0.6)' }}>Smart Real Estate CRM</span>
            </div>
            <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div className="h-full rounded-full" style={{ background: '#17BDD5' }} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.8, ease: 'linear' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
