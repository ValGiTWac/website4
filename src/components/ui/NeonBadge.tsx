'use client'
import { cn } from '@/lib/utils'

interface NeonBadgeProps {
  children: React.ReactNode
  variant?: 'teal' | 'blue' | 'magenta'
  className?: string
}

export function NeonBadge({ children, variant = 'teal', className }: NeonBadgeProps) {
  const colors = {
    teal: 'border-whise-teal/40 text-whise-teal bg-whise-teal/10',
    blue: 'border-whise-blue/40 text-whise-blue bg-whise-blue/10',
    magenta: 'border-whise-magenta/40 text-whise-magenta bg-whise-magenta/10',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide border',
        colors[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
