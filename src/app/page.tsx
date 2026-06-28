import dynamic from 'next/dynamic'
import LenisInit from '@/components/LenisInit'
import HUD from '@/components/ui/HUD'
import ZoneOverlay from '@/components/ui/ZoneOverlay'
import NavBar from '@/components/ui/NavBar'
import MobileView from '@/components/ui/MobileView'
import S05_Pricing from '@/components/sections/S05_Pricing'
import S06_Testimonials from '@/components/sections/S06_Testimonials'
import S07_Integration from '@/components/sections/S07_Integration'
import S08_CTA from '@/components/sections/S08_CTA'
import S09_Footer from '@/components/sections/S09_Footer'

const WorldCanvas = dynamic(() => import('@/components/canvas/WorldCanvas'), { ssr: false })

export default function Home() {
  return (
    <>
      {/* Scanline */}
      <div className="scanline" />

      {/* 3D World — fixed fullscreen */}
      <WorldCanvas />

      {/* Lenis smooth scroll init */}
      <LenisInit />

      {/* Minimal HUD overlays */}
      <HUD />
      <NavBar />
      <ZoneOverlay />

      {/* Mobile fallback */}
      <MobileView />

      {/* Desktop: tall scroll container — 8 zones × 100vh + content sections */}
      <div className="relative z-10 hidden md:block">

        {/* ── IMMERSIVE JOURNEY ── */}
        {/* 800vh scroll space drives the camera through the 8 zones */}
        <div style={{ height: '800vh' }}>
          {/* Hero anchor text — visible only at start */}
          <div className="h-screen flex items-end justify-center pb-32">
            <div className="text-center">
              <p className="font-mono text-[10px] text-white/20 tracking-[0.4em] animate-pulse">
                SCROLL POUR EXPLORER
              </p>
            </div>
          </div>
        </div>

        {/* ── CONTENT SECTIONS ── after the journey */}
        <div className="relative bg-[#050A14]">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-[#050A14] pointer-events-none" />
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
