'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useStore } from '@/lib/store'
import * as THREE from 'three'

export function PostFX() {
  const aberrationRef = useRef<THREE.Vector2>(new THREE.Vector2(0.0008, 0.0005))
  const vignetteRef = useRef(0.35)
  const zoneChanging = useStore((s) => s.zoneChanging)

  useFrame((_, delta) => {
    const target = zoneChanging ? 0.006 : 0.0008
    const vTarget = zoneChanging ? 0.7 : 0.35
    aberrationRef.current.x += (target - aberrationRef.current.x) * delta * 6
    aberrationRef.current.y += (target * 0.5 - aberrationRef.current.y) * delta * 6
    vignetteRef.current += (vTarget - vignetteRef.current) * delta * 4
  })

  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.6} radius={0.8} />
      <DepthOfField focusDistance={0.01} focalLength={0.02} bokehScale={2} />
      <ChromaticAberration
        offset={aberrationRef.current}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette darkness={0.35} offset={0.3} />
      <Noise opacity={0.03} />
    </EffectComposer>
  )
}
