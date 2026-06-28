'use client'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/lib/store'
import { buildCameraPath, getCameraPosition, getCameraTarget } from '@/lib/camera-path'
import { lerp } from '@/lib/three-utils'

const curve = buildCameraPath()

export default function CameraRig() {
  const { camera } = useThree()
  const timeRef = useRef(0)
  const currentPos = useRef(new THREE.Vector3(0, 2, 0))
  const currentTarget = useRef(new THREE.Vector3(0, 1, -10))

  useFrame((_, delta) => {
    timeRef.current += delta
    const progress = useScrollStore.getState().scrollProgress
    const velocity = useScrollStore.getState().scrollVelocity
    const targetPos = getCameraPosition(curve, progress)
    targetPos.y += Math.sin(timeRef.current * 1.2) * 0.03
    const lf = lerp(0.05, 0.12, Math.min(1, Math.abs(velocity) * 0.1))
    currentPos.current.lerp(targetPos, lf)
    camera.position.copy(currentPos.current)
    const lookTarget = getCameraTarget(curve, progress)
    currentTarget.current.lerp(lookTarget, lf)
    camera.lookAt(currentTarget.current)
    camera.rotation.z = lerp(camera.rotation.z, velocity * 0.002, 0.1)
  })
  return null
}
