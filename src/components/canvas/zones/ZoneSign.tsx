'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function LaserPath() {
  const meshRef = useRef<THREE.Mesh>(null)
  const progress = useRef(0)

  useFrame((_, delta) => {
    progress.current = (progress.current + delta * 0.4) % 1
    if (!meshRef.current) return
    const x = -4 + progress.current * 8
    meshRef.current.position.set(x, Math.sin(progress.current * Math.PI * 2) * 0.8, 0)
  })

  return (
    <group>
      {/* Static path outline */}
      <mesh>
        <torusGeometry args={[5, 0.01, 4, 64, Math.PI]} />
        <meshBasicMaterial color="#17BDD5" transparent opacity={0.2} />
      </mesh>
      {/* Moving dot */}
      <mesh ref={meshRef} position={[-4, 0, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color="#17BDD5" />
      </mesh>
    </group>
  )
}

function CompletionBurst() {
  const ref = useRef<THREE.Points>(null)
  const { geo } = useMemo(() => {
    const count = 200
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = Math.random() * 3
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return { geo }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ;(ref.current.material as THREE.PointsMaterial).opacity = 0.4 + 0.3 * Math.abs(Math.sin(clock.elapsedTime * 1.5))
  })

  return (
    <points geometry={geo} ref={ref}>
      <pointsMaterial color="#17BDD5" size={0.06} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function ContractPlane() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.15
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.4) * 0.03
  })
  return (
    <mesh ref={ref}>
      <planeGeometry args={[9, 6, 1, 1]} />
      <meshBasicMaterial color="#0E3A65" transparent opacity={0.4} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function ZoneSign({ opacity = 1 }: { opacity?: number }) {
  return (
    <group>
      <ContractPlane />
      <LaserPath />
      <CompletionBurst />
      <gridHelper args={[60, 60, '#17BDD5', '#0E3A65']} position={[0, -4, 0]} material-transparent material-opacity={0.1} />
    </group>
  )
}
