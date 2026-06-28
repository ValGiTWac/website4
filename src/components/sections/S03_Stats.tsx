'use client'
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 60, damping: 15 })
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (inView) motionVal.set(target)
  }, [inView, motionVal, target])

  useEffect(() => {
    return spring.on('change', v => {
      if (displayRef.current) displayRef.current.textContent = Math.round(v).toLocaleString('fr-BE') + suffix
    })
  }, [spring, suffix])

  return <span ref={displayRef}>0{suffix}</span>
}

const stats = [
  { label: 'Agents actifs', value: 4200, suffix: '+' },
  { label: 'Biens gérés', value: 98000, suffix: '+' },
  { label: 'Transactions / an', value: 23000, suffix: '' },
  { label: 'Pays couverts', value: 8, suffix: '' },
]

export default function S03_Stats() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-10 holo-grid"
        >
          <div className="font-mono text-xs text-[#17BDD5] tracking-widest text-center mb-10">// WHISE EN CHIFFRES</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-[#17BDD5] mb-2">
                  <span ref={null}><AnimatedNumber target={s.value} suffix={s.suffix} /></span>
                </div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
