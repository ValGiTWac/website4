'use client'
import { cn } from '@/lib/utils'
interface P { time: string; theme?: string; className?: string }
export function TimeStamp({ time, theme, className }: P) {
  return (
    <div className={cn('flex flex-col gap-0.5 mb-6', className)}>
      {theme && <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(23,189,213,0.5)' }}>{theme}</span>}
      <span className="font-mono font-bold text-6xl md:text-8xl select-none" style={{ color: 'rgba(23,189,213,0.12)', letterSpacing: '-0.04em' }}>{time}</span>
    </div>
  )
}
