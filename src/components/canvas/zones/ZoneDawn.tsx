'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollStore } from '@/lib/store'

const skyVert = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`
const skyFrag = `varying vec2 vUv;void main(){vec3 dawn=vec3(0.055,0.227,0.396);vec3 horizon=vec3(1.0,0.42,0.208);vec3 zenith=vec3(0.002,0.004,0.08);float t=vUv.y;vec3 color=mix(horizon,dawn,smoothstep(0.0,0.4,t));color=mix(color,zenith,smoothstep(0.5,1.0,t));gl_FragColor=vec4(color,1.0);}`

function Building({ x, z, height, width, depth }: { x:number;z:number;height:number;width:number;depth:number }) {
  const wc = Math.floor(height / 5)
  return (
    <group position={[x, height / 2, z]}>
      <mesh castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial color="#0a0f1a" roughness={0.05} metalness={0.9} transparent opacity={0.95} />
      </mesh>
      {Array.from({ length: wc }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * width * 0.6, (i / wc - 0.5) * height * 0.8, depth / 2 + 0.01]}>
          <planeGeometry args={[0.4, 0.25]} />
          <meshStandardMaterial color="#FFB830" emissive="#FFB830" emissiveIntensity={Math.random() * 0.5 + 0.2} />
        </mesh>
      ))}
    </group>
  )
}

function Particles() {
  const ref = useRef<THREE.Points>(null)
  const count = 500
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) { p[i*3]=(Math.random()-0.5)*80; p[i*3+1]=Math.random()*30; p[i*3+2]=(Math.random()-0.5)*80 }
    return p
  }, [])
  const colors = useMemo(() => {
    const c = new Float32Array(count * 3)
    const pal = [[0,0.416,0.788],[0.09,0.741,0.835],[0.62,0.133,0.42]]
    for (let i = 0; i < count; i++) { const p = pal[Math.floor(Math.random()*3)]; c[i*3]=p[0]; c[i*3+1]=p[1]; c[i*3+2]=p[2] }
    return c
  }, [])
  useFrame(() => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) { pos[i*3+1] += 0.02; if (pos[i*3+1] > 30) pos[i*3+1] = 0 }
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

export default function ZoneDawn() {
  const activeZone = useScrollStore((s) => s.activeZone)
  const buildings = useMemo(() => {
    const r = []
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2, rad = 30 + Math.random() * 20
      r.push({ x: Math.cos(a)*rad, z: Math.sin(a)*rad-15, height: 20+Math.random()*60, width: 3+Math.random()*5, depth: 3+Math.random()*5 })
    }
    return r
  }, [])
  return (
    <group visible={activeZone <= 1}>
      <mesh position={[0, 0, -20]}>
        <sphereGeometry args={[200, 32, 32]} />
        <shaderMaterial vertexShader={skyVert} fragmentShader={skyFrag} side={THREE.BackSide} />
      </mesh>
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.1, -15]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshPhysicalMaterial color="#080a14" roughness={0.15} metalness={0.3} />
      </mesh>
      {buildings.map((b, i) => <Building key={i} {...b} />)}
      <Particles />
      <pointLight position={[0, 5, -30]} intensity={2} color="#FF6B35" distance={80} />
      <pointLight position={[-10, 10, -20]} intensity={1} color="#0E3A65" distance={60} />
    </group>
  )
}
