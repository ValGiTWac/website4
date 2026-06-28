'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
interface P { target: number; suffix?: string; prefix?: string; duration?: number; className?: string }
export function CounterNumber({ target, suffix = '', prefix = '', duration = 1800, className }: P) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t0 = Date.now()
    const id = setInterval(() => {
      const p = Math.min((Date.now() - t0) / duration, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p >= 1) clearInterval(id)
    }, 16)
    return () => clearInterval(id)
  }, [inView, target, duration])
  return <span ref={ref} className={cn('font-mono font-bold tabular-nums', className)}>{prefix}{val}{suffix}</span>
}
