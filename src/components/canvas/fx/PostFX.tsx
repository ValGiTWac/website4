'use client'
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function PostFX() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.4}
        luminanceSmoothing={0.3}
        intensity={1.2}
        blendFunction={BlendFunction.ADD}
      />
      <Vignette eskil={false} offset={0.3} darkness={0.7} />
      <Noise opacity={0.03} blendFunction={BlendFunction.ADD} />
    </EffectComposer>
  )
}
