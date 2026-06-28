'use client'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorldStore } from '@/lib/store'

import ZoneHero from './zones/ZoneHero'
import ZoneLeads from './zones/ZoneLeads'
import ZoneCalls from './zones/ZoneCalls'
import ZoneDrive from './zones/ZoneDrive'
import ZoneVisit from './zones/ZoneVisit'
import ZoneNegotiate from './zones/ZoneNegotiate'
import ZoneSign from './zones/ZoneSign'
import ZoneDashboard from './zones/ZoneDashboard'
import PostFX from './fx/PostFX'

// Zones spaced on Z axis — camera travels forward (negative Z)
const ZONE_POSITIONS: [number, number, number][] = [
  [0, 0, 0],       // 0 Hero
  [0, 0, -80],     // 1 Leads
  [0, 0, -160],    // 2 Calls
  [0, 0, -240],    // 3 Drive
  [0, 0, -320],    // 4 Visit
  [0, 0, -400],    // 5 Negotiate
  [0, 0, -480],    // 6 Sign
  [0, 0, -560],    // 7 Dashboard
]

// Camera path with subtle lateral & vertical drift for cinematic feel
const CAM_WAYPOINTS = ZONE_POSITIONS.map(([x, , z], i) => {
  const drift = [0, 0, 0, 2, -2, 3, -3, 0][i]
  const height = [1.8, 2, 1.8, 0, 1.8, 1.8, 1.8, 1.8][i]
  return new THREE.Vector3(x + drift, height, z + 12)
})

const CAM_PATH = new THREE.CatmullRomCurve3(CAM_WAYPOINTS, false, 'catmullrom', 0.5)

const LOOK_WAYPOINTS = ZONE_POSITIONS.map(([x, , z], i) => {
  const drift = [0, 0, 0, 2, -2, 3, -3, 0][i]
  const height = [1.5, 1.8, 1.5, 0, 1.5, 1.5, 1.5, 1.5][i]
  return new THREE.Vector3(x + drift, height, z - 8)
})

const LOOK_PATH = new THREE.CatmullRomCurve3(LOOK_WAYPOINTS, false, 'catmullrom', 0.5)

const ZONE_COMPONENTS = [
  ZoneHero, ZoneLeads, ZoneCalls, ZoneDrive,
  ZoneVisit, ZoneNegotiate, ZoneSign, ZoneDashboard,
]

function SceneCamera() {
  const { camera } = useThree()
  const { scrollProgress } = useWorldStore()
  const smoothP = useRef(0)

  useFrame((_, delta) => {
    // Smooth scroll following with lag for cinematic weight
    smoothP.current += (scrollProgress - smoothP.current) * Math.min(delta * 2.0, 1)
    const p = Math.max(0, Math.min(1, smoothP.current))

    const targetPos = CAM_PATH.getPoint(p)
    const targetLook = LOOK_PATH.getPoint(p)

    camera.position.lerp(targetPos, delta * 3.5)

    // Build look-at manually to avoid gimbal lock
    const lookDir = new THREE.Vector3().subVectors(targetLook, camera.position).normalize()
    const up = new THREE.Vector3(0, 1, 0)
    const targetQuat = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().lookAt(camera.position, targetLook, up)
    )
    camera.quaternion.slerp(targetQuat, delta * 4)
  })

  return null
}

/* Persistent ambient particles across the whole world */
function WorldParticles() {
  const ref = useRef<THREE.Points>(null)
  const count = 4000
  const geo = (() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = -3 + Math.random() * 20
      pos[i * 3 + 2] = -Math.random() * 600
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  })()

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.005
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#17BDD5" size={0.03} transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

/* Atmospheric ground plane stretching across all zones */
function WorldGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, -280]}>
      <planeGeometry args={[60, 600, 60, 300]} />
      <meshBasicMaterial color="#17BDD5" wireframe transparent opacity={0.04} />
    </mesh>
  )
}

export default function ScifiWorld() {
  return (
    <>
      <SceneCamera />
      <fog attach="fog" args={['#050A14', 30, 120]} />
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#17BDD5" />
      <WorldParticles />
      <WorldGround />
      {ZONE_POSITIONS.map((pos, i) => {
        const ZoneComp = ZONE_COMPONENTS[i]
        return (
          <group key={i} position={pos}>
            <ZoneComp />
          </group>
        )
      })}
      <PostFX />
    </>
  )
}
