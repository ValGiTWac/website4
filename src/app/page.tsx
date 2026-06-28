'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useScrollStore } from '@/lib/store'
import { initLenis, destroyLenis } from '@/lib/scroll'
import { Loader } from '@/components/sections/S00_Loader'
import { S01_Hero } from '@/components/sections/S01_Hero'
import { S02_Leads } from '@/components/sections/S02_Leads'
import { S03_Calls } from '@/components/sections/S03_Calls'
import { S04_Drive } from '@/components/sections/S04_Drive'
import { S05_Visit } from '@/components/sections/S05_Visit'
import { S06_Negotiate } from '@/components/sections/S06_Negotiate'
import { S07_Sign } from '@/components/sections/S07_Sign'
import { S08_Dashboard } from '@/components/sections/S08_Dashboard'
import { S09_Pricing } from '@/components/sections/S09_Pricing'
import { S10_Footer } from '@/components/sections/S10_Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

const WorldCanvas = dynamic(() => import('@/components/canvas/WorldCanvas'), { ssr: false, loading: () => null })

export default function Home() {
  const setMobile = useScrollStore((s) => s.setMobile)
  const rafRef = useRef<number>()

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    setMobile(isMobile)
    if (isMobile) return
    const lenis = initLenis()
    function raf(time: number) { lenis.raf(time); rafRef.current = requestAnimationFrame(raf) }
    rafRef.current = requestAnimationFrame(raf)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); destroyLenis() }
  }, [setMobile])

  return (
    <>
      <Loader />
      <WorldCanvas />
      <ScrollProgress />
      <main className="relative" style={{ height: '1700vh', background: 'transparent' }}>
        <S01_Hero />
        <S02_Leads />
        <S03_Calls />
        <S04_Drive />
        <S05_Visit />
        <S06_Negotiate />
        <S07_Sign />
        <S08_Dashboard />
      </main>
      <S09_Pricing />
      <S10_Footer />
    </>
  )
}
