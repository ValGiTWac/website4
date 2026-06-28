'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Apartment blueprint you walk through */
function BlueprintRoom() {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    // Gentle breathing scale
    const s = 1 + 0.01 * Math.sin(clock.elapsedTime * 0.5)
    ref.current.scale.setScalar(s)
  })

  const walls = useMemo(() => [
    // [x, y, z, rx, ry, rz, w, h]
    { pos: [0, 0, -10] as [number,number,number], rot: [0,0,0] as [number,number,number], w: 20, h: 6 },
    { pos: [-10, 0, 0] as [number,number,number], rot: [0, Math.PI/2, 0] as [number,number,number], w: 20, h: 6 },
    { pos: [10, 0, 0] as [number,number,number], rot: [0, Math.PI/2, 0] as [number,number,number], w: 20, h: 6 },
    { pos: [0, 3, 0] as [number,number,number], rot: [Math.PI/2, 0, 0] as [number,number,number], w: 20, h: 20 }, // ceiling
  ], [])

  return (
    <group ref={ref}>
      {walls.map((w, i) => (
        <mesh key={i} position={w.pos} rotation={w.rot}>
          <planeGeometry args={[w.w, w.h, Math.floor(w.w), Math.floor(w.h)]} />
          <meshBasicMaterial color="#17BDD5" wireframe transparent opacity={0.12} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/* Room divider walls */
function RoomDividers() {
  const segs = useMemo(() => [
    { x: -3, z: -5, len: 6, axis: 'z' },
    { x: 4, z: -3, len: 4, axis: 'x' },
    { x: -6, z: 2, len: 5, axis: 'z' },
  ], [])

  return (
    <>
      {segs.map((s, i) => (
        <mesh
          key={i}
          position={[s.x, 0, s.z]}
          rotation={[0, s.axis === 'z' ? 0 : Math.PI / 2, 0]}
        >
          <planeGeometry args={[s.len, 5]} />
          <meshBasicMaterial color="#17BDD5" transparent opacity={0.08} side={THREE.DoubleSide} wireframe />
        </mesh>
      ))}
    </>
  )
}

/* Floating dimension annotations */
function DimAnnotations() {
  const count = 12
  const refs = useRef<(THREE.Mesh | null)[]>([])

  const data = useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: (Math.random() - 0.5) * 16,
    y: -1 + Math.random() * 4,
    z: -Math.random() * 10,
    phase: i * 0.7,
  })), [])

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      mesh.position.y = data[i].y + 0.15 * Math.sin(clock.elapsedTime * 0.8 + data[i].phase)
      ;(mesh.material as THREE.MeshBasicMaterial).opacity = 0.3 + 0.2 * Math.abs(Math.sin(clock.elapsedTime * 0.4 + data[i].phase))
    })
  })

  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={el => { refs.current[i] = el }} position={[d.x, d.y, d.z]}>
          <planeGeometry args={[0.8 + Math.random(), 0.15]} />
          <meshBasicMaterial color="#17BDD5" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  )
}

/* Blueprint floor grid */
function BPFloor() {
  return (
    <gridHelper args={[24, 24, '#17BDD5', '#006AC9']} position={[0, -2, -5]} material-transparent material-opacity={0.3} />
  )
}

export default function ZoneVisit() {
  return (
    <group>
      <BPFloor />
      <BlueprintRoom />
      <RoomDividers />
      <DimAnnotations />
    </group>
  )
}
