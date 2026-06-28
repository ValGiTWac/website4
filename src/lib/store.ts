import { create } from 'zustand'

interface WorldStore {
  scrollProgress: number
  scrollVelocity: number
  activeZone: number
  prevZone: number
  zoneChanging: boolean
  isLoaded: boolean
  isMobile: boolean
  setScroll: (progress: number, velocity: number) => void
  setZone: (zone: number) => void
  setZoneChanging: (v: boolean) => void
  setLoaded: () => void
  setMobile: (v: boolean) => void
}

export const useStore = create<WorldStore>((set, get) => ({
  scrollProgress: 0,
  scrollVelocity: 0,
  activeZone: 0,
  prevZone: 0,
  zoneChanging: false,
  isLoaded: false,
  isMobile: false,
  setScroll: (progress, velocity) => {
    const { getZoneFromProgress } = require('./zones')
    const newZone = getZoneFromProgress(progress)
    const prev = get().activeZone
    if (newZone !== prev) {
      set({ prevZone: prev, activeZone: newZone, zoneChanging: true })
      setTimeout(() => set({ zoneChanging: false }), 900)
    }
    set({ scrollProgress: progress, scrollVelocity: velocity })
  },
  setZone: (zone) => set((s) => ({ prevZone: s.activeZone, activeZone: zone })),
  setZoneChanging: (v) => set({ zoneChanging: v }),
  setLoaded: () => set({ isLoaded: true }),
  setMobile: (v) => set({ isMobile: v }),
}))
