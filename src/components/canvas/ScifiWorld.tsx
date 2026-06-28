'use client'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useWorldStore } from '@/lib/store'
import { ZONE_BOUNDARIES } from '@/lib/zones'

import ZoneHero from './zones/ZoneHero'
import ZoneLeads from './zones/ZoneLeads'
import ZoneCalls from './zones/ZoneCalls'
import ZoneDrive from './zones/ZoneDrive'
import ZoneVisit from './zones/ZoneVisit'
import ZoneNegotiate from './zones/ZoneNegotiate'
import ZoneSign from './zones/ZoneSign'
import ZoneDashboard from './zones/ZoneDashboard'
import PostFX from './fx/PostFX'

const ZONE_POSITIONS: [number, number, number][] = [
  [0, 0, 0],
  [25, 0, -5],
  [50, 0, 0],
  [75, 0, -5],
  [100, 0, 0],
  [125, 0, -5],
  [150, 0, 0],
  [175, 0, -5],
]

const CAMERA_PATH = new THREE.CatmullRomCurve3(
  ZONE_POSITIONS.map(p => new THREE.Vector3(p[0], p[1] + 2, p[2] + 12))
)

const LOOKAT_PATH = new THREE.CatmullRomCurve3(
  ZONE_POSITIONS.map(p => new THREE.Vector3(p[0], p[1], p[2]))
)

const ZONE_COMPONENTS = [ZoneHero, ZoneLeads, ZoneCalls, ZoneDrive, ZoneVisit, ZoneNegotiate, ZoneSign, ZoneDashboard]

function SceneCamera() {
  const { camera } = useThree()
  const { scrollProgress } = useWorldStore()
  const currentP = useRef(0)

  useFrame((_, delta) => {
    currentP.current = THREE.MathUtils.lerp(currentP.current, scrollProgress, delta * 2.5)
    const camPos = CAMERA_PATH.getPoint(currentP.current)
    const lookPos = LOOKAT_PATH.getPoint(currentP.current)
    camera.position.lerp(camPos, delta * 3)
    const target = new THREE.Vector3()
    target.lerpVectors(camera.position, lookPos, 1)
    camera.lookAt(lookPos)
  })
  return null
}

export default function ScifiWorld() {
  return (
    <>
      <SceneCamera />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 10, 10]} intensity={0.5} color="#17BDD5" />
      <pointLight position={[175, 10, -5]} intensity={0.5} color="#006AC9" />
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
