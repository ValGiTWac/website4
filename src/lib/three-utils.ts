import * as THREE from 'three'

export function disposeMesh(mesh: THREE.Mesh) {
  if (mesh.geometry) mesh.geometry.dispose()
  if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose())
  else if (mesh.material) mesh.material.dispose()
}

export function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
export function clamp(val: number, min: number, max: number) { return Math.max(min, Math.min(max, val)) }
export function mapRange(val: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin)
}
