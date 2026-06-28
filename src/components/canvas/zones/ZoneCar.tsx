'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/lib/store'
export default function ZoneCar() {
  const ref = useRef<THREE.Points>(null)
  const count = 300
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i=0;i<count;i++){p[i*3]=(Math.random()-0.5)*8;p[i*3+1]=(Math.random()-0.5)*6;p[i*3+2]=-238+(Math.random()-0.5)*4}
    return p
  }, [])
  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i=0;i<count;i++){pos[i*3+1]-=0.12;if(pos[i*3+1]<-3)pos[i*3+1]=3}
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  const activeZone = useScrollStore((s) => s.activeZone)
  return (
    <group visible={activeZone === 3}>
      <mesh position={[0,0.6,-244]}><boxGeometry args={[3.2,0.6,0.4]} /><meshStandardMaterial color="#111" roughness={0.9} /></mesh>
      <mesh position={[-0.6,0.8,-243]} rotation={[0.3,0,0]}>
        <torusGeometry args={[0.25,0.03,16,32]} /><meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0,1.2,-244.5]}>
        <boxGeometry args={[2.6,1.2,0.02]} /><meshPhysicalMaterial color="#8BA0B4" transparent opacity={0.3} roughness={0} />
      </mesh>
      <mesh position={[0.5,0.8,-243.5]}>
        <boxGeometry args={[0.4,0.25,0.02]} /><meshStandardMaterial color="#006AC9" emissive="#006AC9" emissiveIntensity={1} />
      </mesh>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#8BA0B4" transparent opacity={0.6} sizeAttenuation />
      </points>
      <pointLight position={[0,1.5,-242]} intensity={0.8} color="#8BA0B4" distance={6} />
    </group>
  )
}
