'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
interface P { name: string; score: number; source: string }
export function LeadScoreBar({ name, score, source }: P) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const color = score >= 80 ? '#17BDD5' : score >= 60 ? '#006AC9' : '#9E226B'
  const dots = Math.round(score / 20)
  return (
    <div ref={ref} className="glass p-3.5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500">{source}</span>
          <span className="font-mono text-xs font-bold" style={{ color }}>{score}</span>
        </div>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div key={i} className="h-1.5 flex-1 rounded-full"
            style={{ background: i < dots ? color : 'rgba(255,255,255,0.08)' }}
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }} />
        ))}
      </div>
    </div>
  )
}
