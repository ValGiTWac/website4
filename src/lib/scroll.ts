'use client'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { useWorldStore } from './store'
import { ZONE_BOUNDARIES } from './zones'

let lenis: Lenis | null = null

export function useLenis() {
  const { setScrollProgress, setZone } = useWorldStore()

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
    })

    function onRaf(time: number) {
      lenis?.raf(time)
      requestAnimationFrame(onRaf)
    }
    const id = requestAnimationFrame(onRaf)

    function onScroll() {
      if (!lenis) return
      const docH = document.documentElement.scrollHeight - window.innerHeight
      if (docH <= 0) return
      const p = Math.max(0, Math.min(1, window.scrollY / docH))
      setScrollProgress(p)

      let zone = 0
      for (let i = ZONE_BOUNDARIES.length - 2; i >= 0; i--) {
        if (p >= ZONE_BOUNDARIES[i]) { zone = i; break }
      }
      setZone(zone)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      lenis?.destroy()
      cancelAnimationFrame(id)
      window.removeEventListener('scroll', onScroll)
    }
  }, [setScrollProgress, setZone])
}
