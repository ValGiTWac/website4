'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/lib/store'

function HoloCard({ position, color = '#17BDD5' }: { position: [number, number, number]; color?: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.04
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
  })
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.7, 0.42, 0.01]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0}
        metalness={0.5}
        transparent opacity={0.55}
      />
    </mesh>
  )
}

export function FloatingElements() {
  const zone = useStore((s) => s.activeZone)
  if (zone !== 1 && zone !== 7) return null
  return (
    <group>
      <HoloCard position={[-1.2, 0.3, -2]} color="#17BDD5" />
      <HoloCard position={[0, 0.5, -2.2]} color="#006AC9" />
      <HoloCard position={[1.2, 0.2, -2]} color="#9E226B" />
    </group>
  )
}
