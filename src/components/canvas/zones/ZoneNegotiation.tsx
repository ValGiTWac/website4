'use client'
import { useScrollStore } from '@/lib/store'
export default function ZoneNegotiation() {
  const activeZone = useScrollStore((s) => s.activeZone)
  return (
    <group visible={activeZone === 5}>
      <mesh position={[0,0.05,-400]} receiveShadow castShadow><boxGeometry args={[5,0.1,2.5]} /><meshStandardMaterial color="#0d0805" roughness={0.4} /></mesh>
      {[[-1,0.12,-399,0.1],[0.5,0.12,-400.5,-0.15],[1.5,0.12,-399.5,0.05],[-0.3,0.12,-401,0.2]].map(([x,y,z,r],i)=>(
        <mesh key={i} position={[x as number,y as number,z as number]} rotation={[0,r as number,0]}>
          <planeGeometry args={[0.6,0.85]} /><meshStandardMaterial color="#e8e8f0" roughness={0.9} transparent opacity={0.9} />
        </mesh>
      ))}
      <spotLight position={[0,8,-400]} intensity={8} angle={0.4} penumbra={0.3} castShadow color="#ffffff" />
    </group>
  )
}
