'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Digital rain columns */
function DigitalRain() {
  const count = 80
  const refs = useRef<(THREE.Mesh | null)[]>([])

  const data = useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: (Math.random() - 0.5) * 120,
    z: -Math.random() * 80,
    speed: 0.5 + Math.random() * 2,
    startY: 30 + Math.random() * 20,
    phase: Math.random() * Math.PI * 2,
    h: 2 + Math.random() * 8,
  })), [])

  useFrame((_, delta) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      mesh.position.y -= data[i].speed * delta
      if (mesh.position.y < -15) mesh.position.y = data[i].startY
      ;(mesh.material as THREE.MeshBasicMaterial).opacity = 0.3 + 0.4 * Math.abs(Math.sin(mesh.position.y * 0.2 + data[i].phase))
    })
  })

  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={el => { refs.current[i] = el }} position={[d.x, d.startY, d.z]}>
          <boxGeometry args={[0.04, d.h, 0.04]} />
          <meshBasicMaterial color="#17BDD5" transparent opacity={0.4} />
        </mesh>
      ))}
    </>
  )
}

/* City towers surrounding the camera corridor */
function CityTowers() {
  const towers = useMemo(() => {
    const list = []
    for (let i = 0; i < 60; i++) {
      const side = Math.random() > 0.5 ? 1 : -1
      list.push({
        x: side * (8 + Math.random() * 40),
        z: -Math.random() * 80,
        w: 1.5 + Math.random() * 4,
        h: 8 + Math.random() * 35,
        d: 1.5 + Math.random() * 4,
      })
    }
    return list
  }, [])

  return (
    <>
      {towers.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]}>
          {/* Tower body */}
          <mesh position={[0, t.h / 2 - 2, 0]}>
            <boxGeometry args={[t.w, t.h, t.d]} />
            <meshBasicMaterial color="#0a1628" transparent opacity={0.9} />
          </mesh>
          {/* Wireframe overlay */}
          <mesh position={[0, t.h / 2 - 2, 0]}>
            <boxGeometry args={[t.w, t.h, t.d]} />
            <meshBasicMaterial color="#17BDD5" wireframe transparent opacity={0.15} />
          </mesh>
          {/* Window lights */}
          {Array.from({ length: Math.floor(t.h / 3) }, (_, j) => (
            <mesh key={j} position={[0, j * 2.8 - 1, t.d / 2 + 0.01]}>
              <planeGeometry args={[t.w * 0.6, 0.3]} />
              <meshBasicMaterial color="#17BDD5" transparent opacity={0.15 + Math.random() * 0.3} />
            </mesh>
          ))}
        </group>
      ))}
    </>
  )
}

/* Infinite grid floor */
function HoloFloor() {
  return (
    <>
      <gridHelper args={[200, 100, '#17BDD5', '#0E3A65']} position={[0, -2, -40]} material-transparent material-opacity={0.25} />
      {/* Glowing center strip under camera path */}
      <mesh position={[0, -1.99, -40]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 200]} />
        <meshBasicMaterial color="#17BDD5" transparent opacity={0.06} />
      </mesh>
    </>
  )
}

/* Scanning arc overhead */
function ScanArch() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.06 + 0.04 * Math.sin(clock.elapsedTime * 0.8)
    }
  })
  return (
    <mesh ref={ref} position={[0, 8, -20]} rotation={[0, 0, 0]}>
      <torusGeometry args={[20, 0.3, 8, 64, Math.PI]} />
      <meshBasicMaterial color="#17BDD5" transparent opacity={0.08} />
    </mesh>
  )
}

export default function ZoneHero() {
  return (
    <group>
      <HoloFloor />
      <CityTowers />
      <DigitalRain />
      <ScanArch />
    </group>
  )
}
