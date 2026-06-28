'use client'
import { useScrollStore } from '@/lib/store'
export default function ZoneOffice() {
  const activeZone = useScrollStore((s) => s.activeZone)
  return (
    <group visible={activeZone >= 1 && activeZone <= 2}>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,-88]} receiveShadow>
        <planeGeometry args={[20,20]} /><meshPhysicalMaterial color="#080810" roughness={0.1} metalness={0.2} />
      </mesh>
      <mesh position={[0,5,-98]}><boxGeometry args={[20,10,0.1]} /><meshStandardMaterial color="#0a0c18" roughness={0.9} /></mesh>
      {/* Desk */}
      <mesh position={[2,0.75,-88]} receiveShadow castShadow><boxGeometry args={[4,0.08,2]} /><meshStandardMaterial color="#1a0f07" roughness={0.6} /></mesh>
      {/* Laptop */}
      <mesh position={[2.5,0.9,-88.3]} rotation={[-0.3,0,0]}>
        <boxGeometry args={[1.4,0.9,0.02]} /><meshStandardMaterial color="#006AC9" emissive="#006AC9" emissiveIntensity={0.8} />
      </mesh>
      {/* Holo cards */}
      {[[0,2.5,-85],[1.5,2.8,-84],[-1.5,2.3,-84]].map(([x,y,z],i) => (
        <mesh key={i} position={[x,y,z]}>
          <boxGeometry args={[1.2,0.7,0.02]} />
          <meshPhysicalMaterial color="#06283A" transparent opacity={0.7} emissive="#17BDD5" emissiveIntensity={0.2} />
        </mesh>
      ))}
      <rectAreaLight position={[2,3.5,-88]} intensity={4} color="#D4A97A" width={3} height={2} />
      <pointLight position={[2.5,1.2,-88.3]} intensity={1.5} color="#006AC9" distance={5} />
    </group>
  )
}
