'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Circular room — audio bars lining the walls */
function AudioRoom() {
  const barCount = 48
  const barRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    barRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const h = 0.5 + 3.5 * Math.abs(Math.sin(t * 2.5 + i * 0.25))
      mesh.scale.y = h
      mesh.position.y = h * 0.5 - 2
    })
  })

  return (
    <>
      {Array.from({ length: barCount }, (_, i) => {
        const angle = (i / barCount) * Math.PI * 2
        const r = 12
        return (
          <mesh
            key={i}
            ref={el => { barRefs.current[i] = el }}
            position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <boxGeometry args={[0.4, 1, 0.4]} />
            <meshBasicMaterial color={i % 3 === 0 ? '#17BDD5' : i % 3 === 1 ? '#006AC9' : '#0E3A65'} transparent opacity={0.9} />
          </mesh>
        )
      })}
    </>
  )
}

/* Expanding wave rings on the floor */
function FloorWaves() {
  const waves = useMemo(() => Array.from({ length: 8 }, (_, i) => i), [])
  const refs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const t = ((clock.elapsedTime * 0.5 + i * 0.4) % 1)
      mesh.scale.setScalar(0.3 + t * 12)
      ;(mesh.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.4
    })
  })

  return (
    <>
      {waves.map(i => (
        <mesh key={i} ref={el => { refs.current[i] = el }} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <ringGeometry args={[0.95, 1, 64]} />
          <meshBasicMaterial color="#17BDD5" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  )
}

/* Floating speech bubble panels */
function VoiceWave() {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.3
  })

  const points = useMemo(() => {
    const pts: number[] = []
    for (let i = 0; i < 128; i++) {
      const t = (i / 128) * Math.PI * 2
      const r = 4 + 1.5 * Math.sin(t * 8)
      pts.push(Math.cos(t) * r, Math.sin(t * 2) * 0.5, Math.sin(t) * r)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return g
  }, [])

  return (
    <group ref={ref} position={[0, 1, 0]}>
      <lineLoop geometry={points}>
        <lineBasicMaterial color="#17BDD5" transparent opacity={0.5} />
      </lineLoop>
    </group>
  )
}

export default function ZoneCalls() {
  return (
    <group>
      <AudioRoom />
      <FloorWaves />
      <VoiceWave />
      <gridHelper args={[60, 30, '#17BDD5', '#0E3A65']} position={[0, -2, 0]} material-transparent material-opacity={0.15} />
    </group>
  )
}
