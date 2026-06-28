'use client'
import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/lib/store'
import { ZONES } from '@/lib/zones'

// Color-graded video plane shader
const vertexShader = `
varying vec2 vUv;
uniform float uScale;
void main() {
  vUv = uv;
  vec3 pos = position;
  pos.xy *= uScale;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
uniform sampler2D uVideo;
uniform vec3 uTint;
uniform float uSaturation;
uniform float uOpacity;
uniform float uCover; // aspect ratio correction

void main() {
  // Object-fit: cover UV
  vec2 uv = vUv;
  uv = (uv - 0.5) * uCover + 0.5;
  uv = clamp(uv, 0.0, 1.0);

  vec4 tex = texture2D(uVideo, uv);
  vec3 col = tex.rgb;

  // Saturation
  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(lum), col, uSaturation);

  // Tint (soft overlay)
  col = mix(col, col * uTint, 0.18);

  gl_FragColor = vec4(col, uOpacity);
}
`

interface VideoPlaneProps {
  zoneId: number
  opacity: number
}

function VideoPlane({ zoneId, opacity }: VideoPlaneProps) {
  const zone = ZONES[zoneId]
  const meshRef = useRef<THREE.Mesh>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const textureRef = useRef<THREE.VideoTexture | null>(null)
  const { viewport, size } = useThree()

  const uniforms = useMemo(() => ({
    uVideo:      { value: null as THREE.VideoTexture | null },
    uTint:       { value: new THREE.Vector3(...zone.tint) },
    uSaturation: { value: zone.saturation },
    uOpacity:    { value: opacity },
    uScale:      { value: 1.0 },
    uCover:      { value: 1.0 },
  }), [zone])

  useEffect(() => {
    const video = document.createElement('video')
    video.src = zone.videoSrc
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.autoplay = true
    video.preload = 'auto'
    video.crossOrigin = 'anonymous'
    video.play().catch(() => {})
    videoRef.current = video

    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.format = THREE.RGBAFormat
    textureRef.current = texture
    uniforms.uVideo.value = texture

    return () => {
      video.pause()
      video.src = ''
      texture.dispose()
    }
  }, [zone.videoSrc, uniforms])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    // Ken Burns: slowly scale up
    uniforms.uScale.value = Math.min(uniforms.uScale.value + delta * 0.006, 1.08)
    uniforms.uOpacity.value = opacity

    // Cover aspect correction
    const vidW = videoRef.current?.videoWidth || 1920
    const vidH = videoRef.current?.videoHeight || 1080
    const vidAspect = vidW / vidH
    const screenAspect = size.width / size.height
    if (vidAspect > screenAspect) {
      uniforms.uCover.value = 1.0
    } else {
      uniforms.uCover.value = screenAspect / vidAspect
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

export function VideoWorld() {
  const activeZone = useStore((s) => s.activeZone)
  const prevZone = useStore((s) => s.prevZone)
  const zoneChanging = useStore((s) => s.zoneChanging)
  const fadeRef = useRef(0) // 0 = fully showing active, 1 = fully showing prev

  // Track crossfade alpha
  const alphaRef = useRef(1)
  const prevAlphaRef = useRef(0)

  useFrame((_, delta) => {
    if (zoneChanging) {
      prevAlphaRef.current = Math.max(0, prevAlphaRef.current - delta * 1.25)
      alphaRef.current = Math.min(1, alphaRef.current + delta * 1.25)
    } else {
      alphaRef.current = 1
      prevAlphaRef.current = 0
    }
  })

  return (
    <>
      {prevZone !== activeZone && (
        <VideoPlane key={`prev-${prevZone}`} zoneId={prevZone} opacity={prevAlphaRef.current} />
      )}
      <VideoPlane key={`active-${activeZone}`} zoneId={activeZone} opacity={alphaRef.current} />
    </>
  )
}
