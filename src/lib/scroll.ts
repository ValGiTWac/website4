import Lenis from 'lenis'
import { useStore } from './store'

let lenis: Lenis | null = null

export function initLenis(): Lenis {
  if (lenis) return lenis
  lenis = new Lenis({
    duration: 1.6,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.7,
  })
  lenis.on('scroll', ({ progress, velocity }: { progress: number; velocity: number }) => {
    useStore.getState().setScroll(progress, velocity)
  })
  return lenis
}

export function destroyLenis() {
  lenis?.destroy(); lenis = null
}

export function getLenis() { return lenis }
