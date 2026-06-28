'use client'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean
}

export function GlassCard({ className, glow = false, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card p-6',
        glow && 'shadow-[0_0_60px_rgba(23,189,213,0.2),0_0_120px_rgba(0,106,201,0.1)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
