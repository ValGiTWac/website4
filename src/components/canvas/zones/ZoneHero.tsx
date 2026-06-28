'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Wireframe city skyline */
function CityBlock({ x, z, h }: { x: number; z: number; h: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + 0.05 * Math.sin(clock.elapsedTime * 0.8 + x)
    }
  })
  return (
    <mesh ref={ref} position={[x, h / 2 - 3, z]}>
      <boxGeometry args={[1.2, h, 1.2]} />
      <meshBasicMaterial color="#17BDD5" wireframe transparent opacity={0.2} />
    </mesh>
  )
}

/* Floating data particles */
function DataParticles() {
  const ref = useRef<THREE.Points>(null)
  const { positions, count } = useMemo(() => {
    const count = 3000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return { positions, count }
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.02
  })

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [positions])

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#17BDD5" size={0.04} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

/* Scanning beam */
function ScanBeam() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.5
      ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.12 + 0.05 * Math.sin(clock.elapsedTime * 2)
    }
  })
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <coneGeometry args={[12, 16, 32, 1, true]} />
      <meshBasicMaterial color="#17BDD5" transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* Hex grid floor */
function HexGrid() {
  const ref = useRef<THREE.GridHelper>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.opacity = 0.12 + 0.03 * Math.sin(clock.elapsedTime * 0.5)
  })
  return (
    <gridHelper
      ref={ref}
      args={[80, 80, '#17BDD5', '#006AC9']}
      position={[0, -3, 0]}
      material-transparent
      material-opacity={0.15}
    />
  )
}

export default function ZoneHero({ opacity = 1 }: { opacity?: number }) {
  const buildings = useMemo(() => {
    const list = []
    for (let i = 0; i < 40; i++) {
      list.push({
        x: (Math.random() - 0.5) * 30,
        z: -5 - Math.random() * 20,
        h: 2 + Math.random() * 10,
      })
    }
    return list
  }, [])

  return (
    <group>
      <HexGrid />
      <DataParticles />
      <ScanBeam />
      {buildings.map((b, i) => <CityBlock key={i} {...b} />)}
    </group>
  )
}
