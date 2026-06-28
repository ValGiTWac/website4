import dynamic from 'next/dynamic'
import LenisInit from '@/components/LenisInit'
import HUD from '@/components/ui/HUD'
import ZoneOverlay from '@/components/ui/ZoneOverlay'
import NavBar from '@/components/ui/NavBar'
import MobileView from '@/components/ui/MobileView'
import S01_Hero from '@/components/sections/S01_Hero'
import S02_Features from '@/components/sections/S02_Features'
import S03_Stats from '@/components/sections/S03_Stats'
import S04_Journey from '@/components/sections/S04_Journey'
import S05_Pricing from '@/components/sections/S05_Pricing'
import S06_Testimonials from '@/components/sections/S06_Testimonials'
import S07_Integration from '@/components/sections/S07_Integration'
import S08_CTA from '@/components/sections/S08_CTA'
import S09_Footer from '@/components/sections/S09_Footer'

const WorldCanvas = dynamic(() => import('@/components/canvas/WorldCanvas'), { ssr: false })

export default function Home() {
  return (
    <>
      {/* Scan line effect */}
      <div className="scanline" />

      {/* 3D Canvas — fixed, full screen */}
      <WorldCanvas />

      {/* Lenis smooth scroll */}
      <LenisInit />

      {/* HUD overlay */}
      <HUD />

      {/* Nav */}
      <NavBar />

      {/* Zone name overlay (bottom-left) */}
      <ZoneOverlay />

      {/* Mobile fallback */}
      <MobileView />

      {/* Desktop scroll content — tall enough to drive camera */}
      <div className="relative z-10 hidden md:block">
        {/* Each section is transparent — content floats above the 3D canvas */}
        {/* The scroll height drives the camera. Sections provide readable content. */}
        <S01_Hero />

        {/* Spacer sections that pair with camera zones */}
        {[1,2,3,4,5,6,7].map(i => (
          <div key={i} className="h-screen" />
        ))}

        {/* Content sections below the 3D journey */}
        <div className="bg-gradient-to-b from-transparent to-[#050A14]">
          <S02_Features />
          <S03_Stats />
          <S04_Journey />
          <S05_Pricing />
          <S06_Testimonials />
          <S07_Integration />
          <S08_CTA />
          <S09_Footer />
        </div>
      </div>
    </>
  )
}
