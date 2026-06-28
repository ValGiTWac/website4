'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LeadScoreBarProps {
  name: string
  score: number
  source?: string
  className?: string
}

export function LeadScoreBar({ name, score, source, className }: LeadScoreBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const color = score >= 80 ? '#17BDD5' : score >= 60 ? '#006AC9' : '#9E226B'

  return (
    <div ref={ref} className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-white font-medium">{name}</span>
        <div className="flex items-center gap-2">
          {source && <span className="text-xs text-slate-500 font-mono">{source}</span>}
          <span className="text-sm font-mono font-bold" style={{ color }}>{score}</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${score}%` } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
