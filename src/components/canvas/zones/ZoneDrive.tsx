'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function NeonRoad() {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.z = (clock.elapsedTime * 3) % 10
  })

  const lines = useMemo(() => Array.from({ length: 30 }, (_, i) => i), [])
  return (
    <group ref={ref}>
      {lines.map(i => (
        <mesh key={i} position={[0, -2.5, -i * 10]}>
          <planeGeometry args={[0.15, 4]} />
          <meshBasicMaterial color="#17BDD5" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function GPSNodes() {
  const count = 40
  const dummyRef = useRef(new THREE.Object3D())
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const positions = useMemo(() => Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 30,
    z: (Math.random() - 0.5) * 30,
  })), [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime
    positions.forEach((p, i) => {
      dummyRef.current.position.set(p.x, -2 + Math.sin(t * 0.8 + i) * 0.2, p.z)
      dummyRef.current.scale.setScalar(0.15)
      dummyRef.current.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummyRef.current.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#006AC9" transparent opacity={0.9} />
    </instancedMesh>
  )
}

function ScanSweep() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 1.2
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
      <ringGeometry args={[0, 15, 3, 1, 0, Math.PI * 0.3]} />
      <meshBasicMaterial color="#17BDD5" transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function ZoneDrive({ opacity = 1 }: { opacity?: number }) {
  return (
    <group>
      <NeonRoad />
      <GPSNodes />
      <ScanSweep />
      <gridHelper args={[80, 40, '#006AC9', '#0E3A65']} position={[0, -2.5, 0]} material-transparent material-opacity={0.15} />
    </group>
  )
}
