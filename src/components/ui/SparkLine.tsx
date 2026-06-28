'use client'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'
interface P { data: number[]; color?: string }
export function SparkLine({ data, color = '#17BDD5' }: P) {
  const d = data.map((v, i) => ({ v, i }))
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={d} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
