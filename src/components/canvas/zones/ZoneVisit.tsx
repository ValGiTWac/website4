'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function BlueprintFloor() {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.1
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.2
    }
  })

  const walls = useMemo(() => [
    { pos: [0, 1, -5] as [number,number,number], scale: [10, 2, 0.1] as [number,number,number] },
    { pos: [0, 1, 5] as [number,number,number], scale: [10, 2, 0.1] as [number,number,number] },
    { pos: [-5, 1, 0] as [number,number,number], scale: [0.1, 2, 10] as [number,number,number] },
    { pos: [5, 1, 0] as [number,number,number], scale: [0.1, 2, 10] as [number,number,number] },
  ], [])

  return (
    <group ref={ref}>
      {walls.map((w, i) => (
        <mesh key={i} position={w.pos}>
          <boxGeometry args={w.scale} />
          <meshBasicMaterial color="#17BDD5" wireframe transparent opacity={0.4} />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10, 20, 20]} />
        <meshBasicMaterial color="#006AC9" wireframe transparent opacity={0.2} />
      </mesh>
      {/* room dividers */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[10, 0.05, 0.1]} />
        <meshBasicMaterial color="#17BDD5" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.1, 0.05, 10]} />
        <meshBasicMaterial color="#17BDD5" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function HoloDimLines() {
  const lines = useMemo(() => {
    const pts = [
      [-5, 2, -5], [5, 2, -5], [5, 2, 5], [-5, 2, 5], [-5, 2, -5],
    ]
    const positions: number[] = []
    for (let i = 0; i < pts.length - 1; i++) {
      positions.push(...pts[i], ...pts[i + 1])
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return g
  }, [])

  return (
    <lineSegments geometry={lines}>
      <lineBasicMaterial color="#17BDD5" transparent opacity={0.5} />
    </lineSegments>
  )
}

export default function ZoneVisit({ opacity = 1 }: { opacity?: number }) {
  return (
    <group>
      <BlueprintFloor />
      <HoloDimLines />
      <gridHelper args={[60, 60, '#17BDD5', '#006AC9']} position={[0, -3, 0]} material-transparent material-opacity={0.1} />
    </group>
  )
}
