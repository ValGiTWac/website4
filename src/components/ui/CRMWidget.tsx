'use client'
import React from 'react'
import { cn } from '@/lib/utils'
interface P { label: string; value: React.ReactNode; icon?: string; sub?: string; trend?: 'up'|'down'; className?: string }
export function CRMWidget({ label, value, icon, sub, trend, className }: P) {
  return (
    <div className={cn('glass p-4', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-500">{label}</span>
        {icon && <span className="text-base">{icon}</span>}
      </div>
      <div className="flex items-end gap-1.5">
        <span className="text-2xl font-bold text-white font-mono tabular-nums leading-none">{value}</span>
        {trend && <span className={cn('text-xs pb-0.5', trend === 'up' ? 'text-emerald-400' : 'text-red-400')}>{trend === 'up' ? '↑' : '↓'}</span>}
      </div>
      {sub && <p className="text-xs text-slate-500 mt-1 font-mono">{sub}</p>}
    </div>
  )
}
