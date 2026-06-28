export interface Zone {
  id: number
  videoSrc: string
  time: string
  theme: string
  tint: [number, number, number]  // RGB 0-1
  saturation: number
}

export const ZONES: Zone[] = [
  { id: 0, videoSrc: '/videos/hero-city-dawn.mp4',    time: '6h45',  theme: 'KPIs & Insights',                   tint: [1.0, 0.604, 0.361], saturation: 1.1  },
  { id: 1, videoSrc: '/videos/office-morning.mp4',    time: '8h00',  theme: 'Lead Treatment — Prioritize',       tint: [1.0, 0.831, 0.627], saturation: 0.95 },
  { id: 2, videoSrc: '/videos/phone-calls.mp4',       time: '9h30',  theme: 'Lead Treatment — Nurture',          tint: [0.831, 0.910, 1.0], saturation: 1.0  },
  { id: 3, videoSrc: '/videos/car-driving.mp4',       time: '11h00', theme: 'Visibility + Market Insights',      tint: [0.784, 0.847, 0.910], saturation: 0.9 },
  { id: 4, videoSrc: '/videos/apartment-visit.mp4',   time: '14h00', theme: 'Lead Treatment — Profiling',        tint: [1.0, 0.894, 0.710], saturation: 1.15 },
  { id: 5, videoSrc: '/videos/negotiation.mp4',       time: '16h30', theme: 'Streamline Transaction',            tint: [0.690, 0.769, 0.847], saturation: 0.85 },
  { id: 6, videoSrc: '/videos/signature.mp4',         time: '18h00', theme: 'Doc Management',                   tint: [1.0, 0.910, 0.816], saturation: 1.0  },
  { id: 7, videoSrc: '/videos/office-morning.mp4',    time: '20h00', theme: 'KPIs & Insights — Performance',    tint: [0.627, 0.722, 0.816], saturation: 0.9  },
]

export const ZONE_BOUNDARIES = [0, 0.12, 0.24, 0.36, 0.48, 0.60, 0.72, 0.84, 1.0]

export function getZoneFromProgress(progress: number): number {
  for (let i = 0; i < ZONE_BOUNDARIES.length - 1; i++) {
    if (progress < ZONE_BOUNDARIES[i + 1]) return i
  }
  return 7
}
