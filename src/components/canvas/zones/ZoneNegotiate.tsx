'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Documents orbiting around the camera */
function OrbitingDocs() {
  const groupRef = useRef<THREE.Group>(null)
  const docs = useMemo(() => Array.from({ length: 14 }, (_, i) => {
    const phi = Math.acos(2 * (i / 14) - 1)
    const theta = (i / 14) * Math.PI * 4
    const r = 5 + (i % 3) * 2
    return {
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta) * 0.4,
      z: r * Math.cos(phi),
      ry: theta,
      w: 1.4 + Math.random() * 0.8,
      h: 1.8 + Math.random() * 0.6,
      phase: i * 0.4,
    }
  }), [])

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.12
    // Individual doc bob
  })

  const docRefs = useRef<(THREE.Mesh | null)[]>([])
  useFrame(({ clock }) => {
    docRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      mesh.position.y = docs[i].y + 0.25 * Math.sin(clock.elapsedTime * 0.7 + docs[i].phase)
      ;(mesh.material as THREE.MeshBasicMaterial).opacity = 0.35 + 0.2 * Math.abs(Math.sin(clock.elapsedTime * 0.5 + i))
    })
  })

  return (
    <group ref={groupRef}>
      {docs.map((d, i) => (
        <group key={i} position={[d.x, d.y, d.z]} rotation={[0, -d.ry, 0]}>
          {/* Doc background */}
          <mesh ref={el => { docRefs.current[i] = el }}>
            <planeGeometry args={[d.w, d.h]} />
            <meshBasicMaterial color="#9E226B" transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
          {/* Doc lines */}
          {Array.from({ length: 5 }, (_, j) => (
            <mesh key={j} position={[0, d.h / 2 - 0.3 - j * 0.28, 0.01]}>
              <planeGeometry args={[d.w * (0.5 + Math.random() * 0.4), 0.04]} />
              <meshBasicMaterial color="#17BDD5" transparent opacity={0.5} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

/* Data table projection on floor */
function DataTable() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) { (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.1 + 0.05 * Math.sin(clock.elapsedTime * 0.6) }
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[12, 8, 12, 8]} />
      <meshBasicMaterial color="#9E226B" wireframe transparent opacity={0.12} />
    </mesh>
  )
}

/* Magenta particle stream */
function MagentaStream() {
  const ref = useRef<THREE.Points>(null)
  const geo = useMemo(() => {
    const count = 600
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < pos.length / 3; i++) {
      pos[i * 3] += (Math.random() - 0.5) * 0.02
      pos[i * 3 + 1] -= 0.02
      if (pos[i * 3 + 1] < -6) pos[i * 3 + 1] = 6
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#9E226B" size={0.05} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function ZoneNegotiate() {
  return (
    <group>
      <MagentaStream />
      <OrbitingDocs />
      <DataTable />
      <gridHelper args={[40, 20, '#9E226B', '#3D0E2A']} position={[0, -2.5, 0]} material-transparent material-opacity={0.2} />
    </group>
  )
}
