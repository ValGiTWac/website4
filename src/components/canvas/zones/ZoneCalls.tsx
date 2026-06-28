'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WaveRipple({ radius, delay }: { radius: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = ((clock.elapsedTime * 0.6 + delay) % 1)
    ref.current.scale.setScalar(0.5 + t * radius);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.5
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.95, 1, 64]} />
      <meshBasicMaterial color="#17BDD5" transparent opacity={0.4} side={THREE.DoubleSide} />
    </mesh>
  )
}

function AudioBars() {
  const bars = useMemo(() => Array.from({ length: 32 }, (_, i) => i), [])
  const refs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const h = 0.5 + 2 * Math.abs(Math.sin(t * 3 + i * 0.4))
      mesh.scale.y = h
      mesh.position.y = h * 0.5 - 2
    })
  })

  return (
    <>
      {bars.map(i => {
        const angle = (i / 32) * Math.PI * 2
        const r = 6
        return (
          <mesh
            key={i}
            ref={el => { refs.current[i] = el }}
            position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
          >
            <boxGeometry args={[0.2, 1, 0.2]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#17BDD5" : "#006AC9"} transparent opacity={0.8} />
          </mesh>
        )
      })}
    </>
  )
}

export default function ZoneCalls({ opacity = 1 }: { opacity?: number }) {
  const ripples = useMemo(() => [0, 0.33, 0.66].map((d, i) => ({ id: i, delay: d, radius: 4 + i })), [])
  return (
    <group>
      <AudioBars />
      {ripples.map(r => <WaveRipple key={r.id} delay={r.delay} radius={r.radius} />)}
      <gridHelper args={[60, 60, '#17BDD5', '#0E3A65']} position={[0, -3, 0]} material-transparent material-opacity={0.1} />
    </group>
  )
}
