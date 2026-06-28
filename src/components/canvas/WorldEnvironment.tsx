'use client'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
export default function WorldEnvironment() {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2('#050A14', 0.008)
    scene.background = new THREE.Color('#050A14')
    return () => { scene.fog = null }
  }, [scene])
  return (
    <>
      <ambientLight intensity={0.15} color="#050A14" />
      <directionalLight position={[10, 20, 5]} intensity={0.3} color="#17BDD5" castShadow shadow-mapSize={[1024, 1024]} />
    </>
  )
}
