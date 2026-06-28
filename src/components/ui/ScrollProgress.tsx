'use client'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-1">
      <div className="w-0.5 h-32 bg-white/5 rounded-full relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-whise-teal rounded-full"
          style={{ scaleY, transformOrigin: 'top' }}
        />
      </div>
    </div>
  )
}
