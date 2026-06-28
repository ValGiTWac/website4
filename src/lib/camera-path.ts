import * as THREE from 'three'

export const ZONE_POSITIONS: THREE.Vector3[] = [
  new THREE.Vector3(0, 2, 0),
  new THREE.Vector3(2, 1.5, -80),
  new THREE.Vector3(0.5, 1.2, -160),
  new THREE.Vector3(0, 1, -240),
  new THREE.Vector3(-1, 1.5, -320),
  new THREE.Vector3(0, 3, -400),
  new THREE.Vector3(0, 1.2, -480),
  new THREE.Vector3(0, 1.8, -560),
]

export function buildCameraPath(): THREE.CatmullRomCurve3 {
  const points = [
    new THREE.Vector3(0, 2, 10),
    ...ZONE_POSITIONS,
    new THREE.Vector3(0, 1.8, -620),
  ]
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)
}

export function getCameraPosition(curve: THREE.CatmullRomCurve3, t: number): THREE.Vector3 {
  return curve.getPoint(Math.max(0, Math.min(1, t)))
}

export function getCameraTarget(curve: THREE.CatmullRomCurve3, t: number): THREE.Vector3 {
  return curve.getPoint(Math.max(0, Math.min(1, t + 0.02)))
}

export const ZONE_BOUNDARIES = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0]
