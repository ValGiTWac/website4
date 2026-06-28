'use client'
import { useScrollStore } from '@/lib/store'
export default function ZoneApartment() {
  const activeZone = useScrollStore((s) => s.activeZone)
  return (
    <group visible={activeZone === 4}>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,-318]} receiveShadow>
        <planeGeometry args={[16,16]} /><meshPhysicalMaterial color="#2a1a0a" roughness={0.6} />
      </mesh>
      <mesh position={[0,3,-326]}><boxGeometry args={[16,6,0.1]} /><meshStandardMaterial color="#1a1a2a" /></mesh>
      <mesh position={[5,3,-325.9]}>
        <boxGeometry args={[3,3,0.05]} /><meshStandardMaterial color="#D4A97A" emissive="#D4A97A" emissiveIntensity={2} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-2,0.5,-320]} castShadow><boxGeometry args={[3,0.6,1.2]} /><meshStandardMaterial color="#1a1230" roughness={0.8} /></mesh>
      {[[0,0,-316],[1.5,0,-316]].map(([x,y,z],i)=>(
        <group key={i} position={[x,y,z]}>
          <mesh position={[0,0.9,0]} castShadow><cylinderGeometry args={[0.2,0.2,1.8,16]} /><meshStandardMaterial color="#0a0a1a" /></mesh>
          <mesh position={[0,1.9,0]} castShadow><sphereGeometry args={[0.2,16,16]} /><meshStandardMaterial color="#0a0a1a" /></mesh>
        </group>
      ))}
      <pointLight position={[0,4,-318]} intensity={3} color="#C4873A" distance={12} castShadow />
    </group>
  )
}
