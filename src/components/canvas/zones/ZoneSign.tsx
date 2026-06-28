'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Grand ceremonial columns */
function Columns() {
  const positions = useMemo(() => [
    [-6, 0, -4], [6, 0, -4],
    [-6, 0, -10], [6, 0, -10],
    [-6, 0, 2], [6, 0, 2],
  ] as [number,number,number][], [])

  return (
    <>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 10, 12]} />
            <meshBasicMaterial color="#17BDD5" wireframe transparent opacity={0.2} />
          </mesh>
          {/* Column glow ring */}
          <mesh position={[0, 4.5, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.5, 0.04, 8, 32]} />
            <meshBasicMaterial color="#17BDD5" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </>
  )
}

/* Laser signature beam on a contract surface */
function SignatureBeam() {
  const dotRef = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const progress = useRef(0)
  const trailCount = 60

  const path = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3.5, 0, 0),
    new THREE.Vector3(-2, 0.6, 0),
    new THREE.Vector3(-0.5, -0.3, 0),
    new THREE.Vector3(1, 0.5, 0),
    new THREE.Vector3(2.5, 0, 0),
    new THREE.Vector3(3.5, 0.4, 0),
  ]), [])

  useFrame((_, delta) => {
    progress.current = (progress.current + delta * 0.35) % 1
    if (!dotRef.current || !trailRef.current) return

    const pt = path.getPoint(progress.current)
    dotRef.current.position.set(pt.x, pt.y + 0.02, pt.z)

    // Trail
    for (let i = 0; i < trailCount; i++) {
      const t = ((progress.current - i * 0.004) + 1) % 1
      const tp = path.getPoint(t)
      dummy.position.set(tp.x, tp.y + 0.02, tp.z)
      const s = (1 - i / trailCount) * 0.06
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      trailRef.current!.setMatrixAt(i, dummy.matrix)
    }
    trailRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group position={[0, 0.1, -5]} rotation={[0, 0, 0]}>
      {/* Contract surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshBasicMaterial color="#0E3A65" transparent opacity={0.5} />
      </mesh>
      {/* Contract wireframe border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[8, 5, 8, 5]} />
        <meshBasicMaterial color="#17BDD5" wireframe transparent opacity={0.15} />
      </mesh>
      {/* Laser dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#17BDD5" />
      </mesh>
      {/* Laser trail */}
      <instancedMesh ref={trailRef} args={[undefined, undefined, trailCount]}>
        <sphereGeometry args={[1, 4, 4]} />
        <meshBasicMaterial color="#17BDD5" transparent opacity={0.8} />
      </instancedMesh>
    </group>
  )
}

/* Completion particle burst */
function CompletionBurst() {
  const ref = useRef<THREE.Points>(null)
  const geo = useMemo(() => {
    const count = 400
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 1 + Math.random() * 7
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ;(ref.current.material as THREE.PointsMaterial).opacity = 0.3 + 0.25 * Math.abs(Math.sin(clock.elapsedTime * 1.2))
  })

  return (
    <points ref={ref} geometry={geo} position={[0, 0, -5]}>
      <pointsMaterial color="#17BDD5" size={0.06} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function ZoneSign() {
  return (
    <group>
      <Columns />
      <SignatureBeam />
      <CompletionBurst />
      <gridHelper args={[40, 20, '#17BDD5', '#0E3A65']} position={[0, -2, -5]} material-transparent material-opacity={0.2} />
    </group>
  )
}
