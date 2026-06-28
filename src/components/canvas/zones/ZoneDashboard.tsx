'use client'
import { useScrollStore } from '@/lib/store'
export default function ZoneDashboard() {
  const activeZone = useScrollStore((s) => s.activeZone)
  return (
    <group visible={activeZone === 7}>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0,-558]} receiveShadow>
        <planeGeometry args={[14,12]} /><meshPhysicalMaterial color="#03040a" roughness={0.1} metalness={0.3} />
      </mesh>
      <mesh position={[0,0.35,-560]} castShadow><boxGeometry args={[3.5,0.08,1.5]} /><meshStandardMaterial color="#0a0a14" /></mesh>
      <group position={[0,0,-558]}>
        <mesh position={[0,0.9,0]}><cylinderGeometry args={[0.2,0.2,1.8,16]} /><meshStandardMaterial color="#05050f" /></mesh>
        <mesh position={[0,1.9,0]}><sphereGeometry args={[0.22,16,16]} /><meshStandardMaterial color="#05050f" /></mesh>
      </group>
      {[[-2.5,-562,'#006AC9'],[-0.8,-563,'#17BDD5'],[0.8,-563,'#006AC9'],[2.5,-562,'#9E226B']].map(([x,z,c],i)=>(
        <group key={i} position={[x as number,2,z as number]}>
          <mesh><boxGeometry args={[1.6,1,0.05]} /><meshStandardMaterial color={c as string} emissive={c as string} emissiveIntensity={0.6} /></mesh>
          <pointLight position={[0,0,0.5]} intensity={0.8} color={c as string} distance={4} />
        </group>
      ))}
      <ambientLight intensity={0.08} color="#050A14" />
    </group>
  )
}
