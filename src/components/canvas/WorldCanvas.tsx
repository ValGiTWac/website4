'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from '@react-three/postprocessing'
import { useScrollStore } from '@/lib/store'
import CameraRig from './CameraRig'
import WorldEnvironment from './WorldEnvironment'
import ZoneDawn from './zones/ZoneDawn'
import ZoneOffice from './zones/ZoneOffice'
import ZoneCar from './zones/ZoneCar'
import ZoneApartment from './zones/ZoneApartment'
import ZoneNegotiation from './zones/ZoneNegotiation'
import ZoneSignature from './zones/ZoneSignature'
import ZoneDashboard from './zones/ZoneDashboard'

function PostFX() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} intensity={0.8} />
      <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={3} />
      <Vignette darkness={0.4} offset={0.3} />
      <Noise opacity={0.04} />
    </EffectComposer>
  )
}

export default function WorldCanvas() {
  const isMobile = useScrollStore((s) => s.isMobile)
  if (isMobile) return null
  return (
    <div id="world-canvas">
      <Canvas
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        camera={{ fov: 75, near: 0.1, far: 1000 }}
        shadows="soft"
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <WorldEnvironment />
          <CameraRig />
          <ZoneDawn />
          <ZoneOffice />
          <ZoneCar />
          <ZoneApartment />
          <ZoneNegotiation />
          <ZoneSignature />
          <ZoneDashboard />
          <PostFX />
        </Suspense>
      </Canvas>
    </div>
  )
}
