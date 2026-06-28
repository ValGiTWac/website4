'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'
import { useStore } from '@/lib/store'
import { VideoWorld } from './VideoWorld'
import { PostFX } from './PostFX'
import { SunLight } from './SunLight'
import { FloatingElements } from './FloatingElements'

export default function WorldCanvas() {
  const isMobile = useStore((s) => s.isMobile)
  if (isMobile) return null
  return (
    <div id="world-canvas">
      <Canvas
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1, alpha: false }}
        camera={{ fov: 60, near: 0.01, far: 100, position: [0, 0, 2] }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <SunLight />
          <VideoWorld />
          <FloatingElements />
          <PostFX />
        </Suspense>
      </Canvas>
    </div>
  )
}
