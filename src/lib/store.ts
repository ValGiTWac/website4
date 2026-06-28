import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface ScrollState {
  scrollProgress: number
  scrollVelocity: number
  activeZone: number
  isLoaded: boolean
  isMobile: boolean
  setScrollProgress: (v: number, velocity?: number) => void
  setActiveZone: (z: number) => void
  setLoaded: () => void
  setMobile: (v: boolean) => void
}

export const useScrollStore = create<ScrollState>()(
  immer((set) => ({
    scrollProgress: 0,
    scrollVelocity: 0,
    activeZone: 0,
    isLoaded: false,
    isMobile: false,
    setScrollProgress: (v, velocity = 0) =>
      set((state) => {
        state.scrollProgress = v
        state.scrollVelocity = velocity
        state.activeZone = Math.min(7, Math.floor(v * 8))
      }),
    setActiveZone: (z) => set((state) => { state.activeZone = z }),
    setLoaded: () => set((state) => { state.isLoaded = true }),
    setMobile: (v) => set((state) => { state.isMobile = v }),
  }))
)
