'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function NetworkNodes() {
  const nodesRef = useRef<THREE.InstancedMesh>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const { nodePositions, linePositions } = useMemo(() => {
    const count = 60
    const nodePositions: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      nodePositions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ))
    }
    const linePositions: number[] = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 5) {
          linePositions.push(...nodePositions[i].toArray(), ...nodePositions[j].toArray())
        }
      }
    }
    return { nodePositions, linePositions }
  }, [])

  useFrame(({ clock }) => {
    if (!nodesRef.current) return
    const t = clock.elapsedTime
    const dummy = new THREE.Object3D()
    nodePositions.forEach((pos, i) => {
      dummy.position.set(pos.x, pos.y + Math.sin(t * 0.5 + i) * 0.3, pos.z)
      dummy.scale.setScalar(0.08 + 0.03 * Math.sin(t + i * 0.4))
      dummy.updateMatrix()
      nodesRef.current!.setMatrixAt(i, dummy.matrix)
    })
    nodesRef.current.instanceMatrix.needsUpdate = true
  })

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    return g
  }, [linePositions])

  return (
    <>
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodePositions.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#006AC9" />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial color="#17BDD5" transparent opacity={0.25} />
      </lineSegments>
    </>
  )
}

function PulseRings() {
  const rings = useMemo(() => Array.from({ length: 6 }, (_, i) => i), [])
  return (
    <>
      {rings.map(i => (
        <PulseRing key={i} delay={i * 0.5} />
      ))}
    </>
  )
}

function PulseRing({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = ((clock.elapsedTime + delay) % 3) / 3
    ref.current.scale.setScalar(1 + t * 8)
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.3
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.8, 1, 32]} />
      <meshBasicMaterial color="#006AC9" transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  )
}

export default function ZoneLeads({ opacity = 1 }: { opacity?: number }) {
  return (
    <group>
      <NetworkNodes />
      <PulseRings />
      <gridHelper args={[60, 60, '#006AC9', '#0E3A65']} position={[0, -4, 0]} material-transparent material-opacity={0.12} />
    </group>
  )
}
