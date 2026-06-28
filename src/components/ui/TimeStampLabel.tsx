'use client'
import { cn } from '@/lib/utils'

interface TimeStampLabelProps {
  time: string
  theme?: string
  className?: string
}

export function TimeStampLabel({ time, theme, className }: TimeStampLabelProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="font-mono text-xs tracking-widest text-whise-teal/60 uppercase">
        {theme}
      </span>
      <span
        className="font-mono font-bold text-5xl md:text-7xl tracking-tight"
        style={{
          color: 'rgba(23,189,213,0.15)',
          fontFamily: 'var(--font-geist-mono, monospace)',
        }}
      >
        {time}
      </span>
    </div>
  )
}
