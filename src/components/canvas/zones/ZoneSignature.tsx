'use client'
import { useScrollStore } from '@/lib/store'
export default function ZoneSignature() {
  const activeZone = useScrollStore((s) => s.activeZone)
  return (
    <group visible={activeZone === 6}>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,-478]} receiveShadow>
        <planeGeometry args={[8,6]} /><meshPhysicalMaterial color="#04050c" roughness={0.15} metalness={0.3} />
      </mesh>
      <mesh position={[0,0.08,-479]} castShadow><boxGeometry args={[0.8,0.02,1.1]} /><meshStandardMaterial color="#111118" roughness={0.3} metalness={0.8} /></mesh>
      <mesh position={[0,0.1,-479]}>
        <boxGeometry args={[0.72,0.01,1.0]} /><meshStandardMaterial color="#17BDD5" emissive="#17BDD5" emissiveIntensity={1.2} />
      </mesh>
      <pointLight position={[0,0.8,-479]} intensity={2} color="#17BDD5" distance={4} />
      <pointLight position={[2,2,-475]} intensity={1.5} color="#D4A97A" distance={8} />
    </group>
  )
}
