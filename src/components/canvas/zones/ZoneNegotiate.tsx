'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingDoc({ position, index }: { position: [number, number, number]; index: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.6 + index) * 0.3
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.3 + index * 0.7) * 0.2
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = 0.5 + 0.2 * Math.sin(clock.elapsedTime + index)
  })
  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[1.5, 2]} />
      <meshBasicMaterial color="#9E226B" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  )
}

function DataStream() {
  const ref = useRef<THREE.Points>(null)
  const { geo } = useMemo(() => {
    const count = 500
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return { geo }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < pos.length / 3; i++) {
      pos[i * 3 + 1] -= 0.02
      if (pos[i * 3 + 1] < -7.5) pos[i * 3 + 1] = 7.5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#9E226B" size={0.05} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

export default function ZoneNegotiate({ opacity = 1 }: { opacity?: number }) {
  const docs = useMemo(() => [
    [-4, 1, -2] as [number, number, number],
    [-1.5, 0, -1] as [number, number, number],
    [1.5, 0.5, -1.5] as [number, number, number],
    [4, 1.2, -2] as [number, number, number],
    [0, 2, 0] as [number, number, number],
  ], [])

  return (
    <group>
      <DataStream />
      {docs.map((pos, i) => <FloatingDoc key={i} position={pos} index={i} />)}
      <gridHelper args={[60, 60, '#9E226B', '#0E3A65']} position={[0, -3, 0]} material-transparent material-opacity={0.12} />
    </group>
  )
}
