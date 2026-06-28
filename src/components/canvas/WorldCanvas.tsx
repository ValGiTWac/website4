'use client'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

const ScifiWorld = dynamic(() => import('./ScifiWorld'), { ssr: false })

export default function WorldCanvas() {
  return (
    <div className="fixed inset-0 z-0 hidden md:block">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ fov: 60, near: 0.1, far: 600 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#050A14' }}
      >
        <Suspense fallback={null}>
          <ScifiWorld />
        </Suspense>
      </Canvas>
    </div>
  )
}
