import { create } from 'zustand'

interface WorldState {
  scrollProgress: number
  activeZone: number
  prevZone: number
  zoneTransitioning: boolean
  menuOpen: boolean
  setScrollProgress: (p: number) => void
  setZone: (z: number) => void
  setMenuOpen: (o: boolean) => void
}

export const useWorldStore = create<WorldState>((set, get) => ({
  scrollProgress: 0,
  activeZone: 0,
  prevZone: 0,
  zoneTransitioning: false,
  menuOpen: false,

  setScrollProgress: (p) => set({ scrollProgress: p }),

  setZone: (z) => {
    const { activeZone } = get()
    if (z === activeZone) return
    set({ prevZone: activeZone, activeZone: z, zoneTransitioning: true })
    setTimeout(() => set({ zoneTransitioning: false }), 800)
  },

  setMenuOpen: (o) => set({ menuOpen: o }),
}))
