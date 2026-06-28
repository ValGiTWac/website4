'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Tunnel walls with neon streaks rushing past */
function NeonTunnel() {
  const streakCount = 80
  const streakRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const streaks = useMemo(() => Array.from({ length: streakCount }, () => {
    const angle = Math.random() * Math.PI * 2
    const r = 9 + Math.random() * 4
    return {
      angle,
      r,
      z: -Math.random() * 80,
      speed: 15 + Math.random() * 25,
      len: 0.5 + Math.random() * 3,
    }
  }), [])

  useFrame((_, delta) => {
    if (!streakRef.current) return
    streaks.forEach((s, i) => {
      s.z += s.speed * delta
      if (s.z > 5) s.z = -80
      dummy.position.set(Math.cos(s.angle) * s.r, Math.sin(s.angle) * s.r, s.z)
      dummy.rotation.z = s.angle + Math.PI / 2
      dummy.scale.set(0.06, s.len, 0.06)
      dummy.updateMatrix()
      streakRef.current!.setMatrixAt(i, dummy.matrix)
    })
    streakRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      {/* Tunnel rings */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={i} position={[0, 0, -i * 5]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[11, 0.08, 8, 64]} />
          <meshBasicMaterial color="#006AC9" transparent opacity={0.15} />
        </mesh>
      ))}
      {/* Tunnel body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -50]}>
        <cylinderGeometry args={[12, 12, 100, 32, 1, true]} />
        <meshBasicMaterial color="#050A14" side={THREE.BackSide} transparent opacity={0.95} />
      </mesh>
      {/* Streaks */}
      <instancedMesh ref={streakRef} args={[undefined, undefined, streakCount]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#17BDD5" transparent opacity={0.8} />
      </instancedMesh>
    </>
  )
}

/* Road center line rushing toward camera */
function RoadLines() {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.z = (clock.elapsedTime * 20) % 8
  })

  return (
    <group ref={ref}>
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={i} position={[0, -9.8, -i * 8]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 3]} />
          <meshBasicMaterial color="#17BDD5" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

/* GPS pins floating by */
function GPSPins() {
  const count = 20
  const refs = useRef<(THREE.Mesh | null)[]>([])
  const data = useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: (Math.random() - 0.5) * 8,
    y: (Math.random() - 0.5) * 6,
    z: -i * 4 - Math.random() * 3,
    speed: 8 + Math.random() * 8,
  })), [])

  useFrame((_, delta) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      data[i].z += data[i].speed * delta
      if (data[i].z > 3) data[i].z = -80
      mesh.position.z = data[i].z
    })
  })

  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={el => { refs.current[i] = el }} position={[d.x, d.y, d.z]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshBasicMaterial color="#006AC9" />
        </mesh>
      ))}
    </>
  )
}

export default function ZoneDrive() {
  return (
    <group>
      <NeonTunnel />
      <RoadLines />
      <GPSPins />
    </group>
  )
}
