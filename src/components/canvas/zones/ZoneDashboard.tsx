'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Curved holoscreens wrapping around the camera */
function HoloScreens() {
  const screenCount = 9
  const refs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return
      const t = clock.elapsedTime
      ;(mesh.material as THREE.MeshBasicMaterial).opacity = 0.2 + 0.12 * Math.sin(t * 0.7 + i * 0.6)
    })
  })

  return (
    <>
      {Array.from({ length: screenCount }, (_, i) => {
        const angle = ((i - (screenCount - 1) / 2) / (screenCount - 1)) * Math.PI * 1.4
        const r = 8
        const x = Math.sin(angle) * r
        const z = -Math.cos(angle) * r - 2
        return (
          <group key={i} position={[x, 0.5, z]} rotation={[0, -angle, 0]}>
            <mesh ref={el => { refs.current[i] = el }}>
              <planeGeometry args={[2.2, 1.4]} />
              <meshBasicMaterial color="#006AC9" transparent opacity={0.25} side={THREE.DoubleSide} />
            </mesh>
            {/* Screen border glow */}
            <mesh>
              <planeGeometry args={[2.2, 1.4, 4, 2]} />
              <meshBasicMaterial color="#17BDD5" wireframe transparent opacity={0.4} />
            </mesh>
            {/* Fake chart lines */}
            {Array.from({ length: 4 }, (_, j) => (
              <mesh key={j} position={[0, 0.35 - j * 0.22, 0.01]}>
                <planeGeometry args={[1.8 * (0.4 + Math.random() * 0.6), 0.04]} />
                <meshBasicMaterial color="#17BDD5" transparent opacity={0.4} />
              </mesh>
            ))}
          </group>
        )
      })}
    </>
  )
}

/* Orbiting data spheres at different heights */
function DataOrbits() {
  const orbits = useMemo(() => [
    { radius: 4, speed: 0.6, phase: 0, y: 2, color: '#17BDD5', size: 0.2 },
    { radius: 4, speed: 0.6, phase: Math.PI * 0.67, y: 2, color: '#006AC9', size: 0.18 },
    { radius: 4, speed: 0.6, phase: Math.PI * 1.33, y: 2, color: '#9E226B', size: 0.18 },
    { radius: 6, speed: 0.35, phase: 0.5, y: -0.5, color: '#17BDD5', size: 0.14 },
    { radius: 6, speed: 0.35, phase: Math.PI, y: 0.5, color: '#DC2550', size: 0.14 },
    { radius: 2.5, speed: 1.2, phase: 0, y: 3.5, color: '#17BDD5', size: 0.12 },
  ], [])

  const refs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    orbits.forEach((o, i) => {
      if (!refs.current[i]) return
      const t = clock.elapsedTime * o.speed + o.phase
      refs.current[i]!.position.set(Math.cos(t) * o.radius, o.y, Math.sin(t) * o.radius)
    })
  })

  return (
    <>
      {/* Orbit rings */}
      {[4, 6, 2.5].map((r, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, [2, -0.5, 3.5][i], 0]}>
          <ringGeometry args={[r - 0.02, r + 0.02, 64]} />
          <meshBasicMaterial color="#17BDD5" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Spheres */}
      {orbits.map((o, i) => (
        <mesh key={i} ref={el => { refs.current[i] = el }}>
          <sphereGeometry args={[o.size, 12, 12]} />
          <meshBasicMaterial color={o.color} />
        </mesh>
      ))}
    </>
  )
}

/* Central data orb (icosahedron) */
function CentralOrb() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (outerRef.current) {
      outerRef.current.rotation.y = clock.elapsedTime * 0.2
      outerRef.current.rotation.x = clock.elapsedTime * 0.1
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -clock.elapsedTime * 0.4
      const s = 1 + 0.1 * Math.sin(clock.elapsedTime * 1.5)
      innerRef.current.scale.setScalar(s)
    }
  })

  return (
    <group position={[0, 1, 0]}>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial color="#17BDD5" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#006AC9" wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

export default function ZoneDashboard() {
  return (
    <group>
      <CentralOrb />
      <HoloScreens />
      <DataOrbits />
      <gridHelper args={[40, 20, '#006AC9', '#0E3A65']} position={[0, -3.5, 0]} material-transparent material-opacity={0.2} />
    </group>
  )
}
