'use client'
import { useStore } from '@/lib/store'

const zoneAmbient: Record<number, string> = {
  0: '#FF9A5C', 1: '#FFD4A0', 2: '#D4E8FF',
  3: '#C8D8E8', 4: '#FFE4B5', 5: '#B0C4D8',
  6: '#FFE8D0', 7: '#A0B8D0',
}

export function SunLight() {
  const zone = useStore((s) => s.activeZone)
  const color = zoneAmbient[zone] ?? '#FFD4A0'
  return (
    <>
      <ambientLight intensity={0.4} color={color} />
      <directionalLight position={[5, 8, 3]} intensity={0.8} color={color} />
    </>
  )
}
