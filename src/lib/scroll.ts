import Lenis from 'lenis'
import { useScrollStore } from './store'

let lenisInstance: Lenis | null = null

export function initLenis(): Lenis {
  if (lenisInstance) return lenisInstance
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.8,
  })
  lenis.on('scroll', ({ progress, velocity }: { progress: number; velocity: number }) => {
    useScrollStore.getState().setScrollProgress(progress, velocity)
  })
  lenisInstance = lenis
  return lenis
}

export function getLenis(): Lenis | null { return lenisInstance }

export function destroyLenis() {
  if (lenisInstance) { lenisInstance.destroy(); lenisInstance = null }
}
