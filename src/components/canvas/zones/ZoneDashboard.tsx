'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function OrbitingSphere({ radius, speed, phase, color }: { radius: number; speed: number; phase: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.7) * 1.5, Math.sin(t) * radius)
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

function HoloScreen({ position, index }: { position: [number, number, number]; index: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.25 + 0.1 * Math.sin(clock.elapsedTime * 0.8 + index)
  })
  return (
    <mesh ref={ref} position={position} rotation={[0, (index - 1.5) * 0.4, 0]}>
      <planeGeometry args={[2.5, 1.6]} />
      <meshBasicMaterial color="#006AC9" transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  )
}

function DataOrb() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.elapsedTime * 0.3
    ref.current.rotation.x = clock.elapsedTime * 0.15
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + 0.05 * Math.sin(clock.elapsedTime)
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2, 2]} />
      <meshBasicMaterial color="#17BDD5" wireframe transparent opacity={0.2} />
    </mesh>
  )
}

export default function ZoneDashboard({ opacity = 1 }: { opacity?: number }) {
  const screens = useMemo(() => [
    [-4.5, 0, -2] as [number, number, number],
    [-1.8, 0, -3] as [number, number, number],
    [1.8, 0, -3] as [number, number, number],
    [4.5, 0, -2] as [number, number, number],
  ], [])

  return (
    <group>
      <DataOrb />
      {screens.map((pos, i) => <HoloScreen key={i} position={pos} index={i} />)}
      <OrbitingSphere radius={4} speed={0.5} phase={0} color="#17BDD5" />
      <OrbitingSphere radius={4} speed={0.5} phase={Math.PI * 0.66} color="#006AC9" />
      <OrbitingSphere radius={4} speed={0.5} phase={Math.PI * 1.33} color="#9E226B" />
      <OrbitingSphere radius={6} speed={0.3} phase={0.5} color="#17BDD5" />
      <OrbitingSphere radius={6} speed={0.3} phase={Math.PI} color="#DC2550" />
      <gridHelper args={[80, 80, '#006AC9', '#0E3A65']} position={[0, -4, 0]} material-transparent material-opacity={0.15} />
    </group>
  )
}
