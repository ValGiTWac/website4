'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CounterNumberProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function CounterNumber({ target, suffix = '', prefix = '', duration = 2000, className }: CounterNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(eased * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={cn('font-mono font-bold tabular-nums', className)}>
      {prefix}{current}{suffix}
    </span>
  )
}
