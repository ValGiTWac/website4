'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/lib/store'

export function Loader() {
  const [show, setShow] = useState(true)
  const setLoaded = useStore((s) => s.setLoaded)
  useEffect(() => {
    const t = setTimeout(() => { setShow(false); setLoaded() }, 2000)
    return () => clearTimeout(t)
  }, [setLoaded])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: '#050A14' }}
          exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center gap-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#0E3A65,#17BDD5,#9E226B,#DC2550)' }}>
              <span className="text-white font-black text-xl" style={{ fontFamily: 'var(--font-geist-sans)' }}>W</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-white font-black text-2xl tracking-tight">WHISE</span>
              <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(23,189,213,0.6)' }}>SMART REAL ESTATE CRM</span>
            </div>
            <div className="w-40 h-px overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div className="h-full rounded-full" style={{ background: '#17BDD5' }}
                initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.7, ease: 'linear' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
