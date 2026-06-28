'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* Sphere of nodes surrounding the camera */
function NodeSphere() {
  const count = 120
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const nodeData = useMemo(() => Array.from({ length: count }, (_, i) => {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const r = 6 + Math.random() * 10
    return {
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi),
      speed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }
  }), [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime
    nodeData.forEach((n, i) => {
      const pulse = 1 + 0.2 * Math.sin(t * n.speed + n.phase)
      dummy.position.set(n.x * pulse, n.y * pulse, n.z * pulse)
      dummy.scale.setScalar(0.08 + 0.04 * Math.sin(t * n.speed * 2))
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
    meshRef.current.rotation.y = t * 0.05
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#006AC9" />
    </instancedMesh>
  )
}

/* Connection lines between nearby nodes */
function ConnectionLines() {
  const geo = useMemo(() => {
    const pts: number[] = []
    const count = 40
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const phi1 = Math.acos(2 * (i / count) - 1)
        const theta1 = (i / count) * Math.PI * 6
        const phi2 = Math.acos(2 * (j / count) - 1)
        const theta2 = (j / count) * Math.PI * 6
        const r = 8
        const x1 = r * Math.sin(phi1) * Math.cos(theta1)
        const y1 = r * Math.sin(phi1) * Math.sin(theta1)
        const z1 = r * Math.cos(phi1)
        const x2 = r * Math.sin(phi2) * Math.cos(theta2)
        const y2 = r * Math.sin(phi2) * Math.sin(theta2)
        const z2 = r * Math.cos(phi2)
        const dist = Math.sqrt((x2-x1)**2+(y2-y1)**2+(z2-z1)**2)
        if (dist < 6) pts.push(x1,y1,z1, x2,y2,z2)
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return g
  }, [])

  const ref = useRef<THREE.LineSegments>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.05
  })

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#17BDD5" transparent opacity={0.15} />
    </lineSegments>
  )
}

/* Central pulsing AI core */
function AICore() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const s = 1 + 0.15 * Math.sin(clock.elapsedTime * 2)
    ref.current.scale.setScalar(s)
    ref.current.rotation.y = clock.elapsedTime * 0.8
    ref.current.rotation.x = clock.elapsedTime * 0.3
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshBasicMaterial color="#17BDD5" wireframe transparent opacity={0.6} />
    </mesh>
  )
}

/* Floor grid */
function LeadsFloor() {
  return (
    <gridHelper args={[60, 30, '#006AC9', '#0E3A65']} position={[0, -8, 0]} material-transparent material-opacity={0.2} />
  )
}

export default function ZoneLeads() {
  return (
    <group>
      <LeadsFloor />
      <NodeSphere />
      <ConnectionLines />
      <AICore />
    </group>
  )
}
