'use client'
import { motion } from 'framer-motion'
export function DataStream() {
  return (
    <svg width="260" height="80" viewBox="0 0 260 80" fill="none" className="my-3">
      {[[20,40,130,40],[60,20,130,40],[60,60,130,40],[200,20,130,40],[200,60,130,40]].map(([x1,y1,x2,y2],i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#17BDD5" strokeWidth="1" strokeDasharray="4 4"
          strokeOpacity={0.4}
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          transition={{ delay: i * 0.15, duration: 1.2, ease: 'easeOut' }}
        />
      ))}
      <circle cx="130" cy="40" r="8" fill="#17BDD5" fillOpacity={0.15} stroke="#17BDD5" strokeWidth="1.5" />
      <text x="130" y="44" textAnchor="middle" fill="#17BDD5" fontSize="7" fontFamily="monospace">W</text>
    </svg>
  )
}
