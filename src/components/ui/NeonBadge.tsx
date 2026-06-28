'use client'
import { cn } from '@/lib/utils'
type V = 'teal'|'blue'|'magenta'|'red'
interface P { children: React.ReactNode; variant?: V; className?: string }
export function NeonBadge({ children, variant = 'teal', className }: P) {
  const s: Record<V, string> = {
    teal:    'border-[#17BDD5]/40 text-[#17BDD5] bg-[#17BDD5]/10',
    blue:    'border-[#006AC9]/40 text-[#006AC9] bg-[#006AC9]/10',
    magenta: 'border-[#9E226B]/40 text-[#9E226B] bg-[#9E226B]/10',
    red:     'border-[#DC2550]/40 text-[#DC2550] bg-[#DC2550]/10',
  }
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide border', s[variant], className)}>
      {children}
    </span>
  )
}
