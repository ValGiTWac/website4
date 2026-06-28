'use client'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
interface P extends HTMLAttributes<HTMLDivElement> { glow?: boolean }
export function GlassCard({ className, glow, children, ...p }: P) {
  return (
    <div className={cn('glass p-5', glow && 'shadow-[0_0_80px_rgba(23,189,213,0.25)]', className)} {...p}>
      {children}
    </div>
  )
}
