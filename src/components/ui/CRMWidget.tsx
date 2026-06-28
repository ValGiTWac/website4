'use client'
import { cn } from '@/lib/utils'

interface CRMWidgetProps {
  label: string
  value: string | number
  icon?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function CRMWidget({ label, value, icon, trend, className }: CRMWidgetProps) {
  return (
    <div className={cn('glass-card p-4 flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-white font-mono">{value}</span>
        {trend && (
          <span className={cn('text-xs pb-1', {
            'text-emerald-400': trend === 'up',
            'text-red-400': trend === 'down',
            'text-slate-400': trend === 'neutral',
          })}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
    </div>
  )
}
