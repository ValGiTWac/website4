'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
interface P { text: string; speed?: number; className?: string }
export function TypewriterText({ text, speed = 45, className }: P) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [shown, setShown] = useState('')
  useEffect(() => {
    if (!inView) return
    let i = 0
    const id = setInterval(() => {
      setShown(text.slice(0, ++i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [inView, text, speed])
  return <span ref={ref} className={cn('font-mono', className)}>{shown}<span className="animate-pulse ml-0.5">|</span></span>
}
