export interface Zone {
  id: number
  title: string
  subtitle: string
  time: string
  theme: string
  accentColor: string
  accentHex: string
  description: string
  kpiLabel: string
  kpiValue: string
}

export const ZONES: Zone[] = [
  {
    id: 0,
    title: "Bienvenue dans WHISE",
    subtitle: "PropTech AI — Bruxelles, depuis 2003",
    time: "6h45",
    theme: "Hero · Holographic City",
    accentColor: "teal",
    accentHex: "#17BDD5",
    description: "L'IA au service de l'immobilier belge. Gérez, automatisez, dominez votre marché.",
    kpiLabel: "Agents actifs",
    kpiValue: "4 200+",
  },
  {
    id: 1,
    title: "Captez vos leads",
    subtitle: "Intelligence IA · Scoring automatique",
    time: "8h00",
    theme: "Leads · Neural Network",
    accentColor: "blue",
    accentHex: "#006AC9",
    description: "Chaque lead est analysé, scoré et routé vers le bon agent en temps réel.",
    kpiLabel: "Leads générés / mois",
    kpiValue: "12 500",
  },
  {
    id: 2,
    title: "Maîtrisez vos appels",
    subtitle: "Call center IA · Transcription auto",
    time: "9h30",
    theme: "Calls · Wave Comm",
    accentColor: "teal",
    accentHex: "#17BDD5",
    description: "Transcription, analyse de sentiment, rappels intelligents — tout en un.",
    kpiLabel: "Appels traités / jour",
    kpiValue: "3 800",
  },
  {
    id: 3,
    title: "Optimisez vos déplacements",
    subtitle: "GPS IA · Routage intelligent",
    time: "11h00",
    theme: "Drive · Navigation Grid",
    accentColor: "blue",
    accentHex: "#006AC9",
    description: "Planifiez vos visites, optimisez vos trajets, économisez 40% de temps.",
    kpiLabel: "Km économisés / mois",
    kpiValue: "18 000",
  },
  {
    id: 4,
    title: "Visualisez chaque bien",
    subtitle: "Visite virtuelle · Blueprint 3D",
    time: "14h00",
    theme: "Visit · Blueprint Hologram",
    accentColor: "teal",
    accentHex: "#17BDD5",
    description: "Plans 3D interactifs, visites virtuelles, fiches automatiques — impressionnez vos clients.",
    kpiLabel: "Biens en portefeuille",
    kpiValue: "98 000+",
  },
  {
    id: 5,
    title: "Négociez intelligemment",
    subtitle: "Data room · Analyse IA",
    time: "16h30",
    theme: "Negotiate · Data Docs",
    accentColor: "magenta",
    accentHex: "#9E226B",
    description: "Comparez les offres, analysez les contre-propositions, concluez plus vite.",
    kpiLabel: "Offres analysées / mois",
    kpiValue: "5 600",
  },
  {
    id: 6,
    title: "Signez en quelques clics",
    subtitle: "e-Signature · Blockchain",
    time: "18h00",
    theme: "Signature · Laser Sign",
    accentColor: "teal",
    accentHex: "#17BDD5",
    description: "Signature électronique certifiée, archivage cloud, conformité RGPD totale.",
    kpiLabel: "Contrats signés / jour",
    kpiValue: "340",
  },
  {
    id: 7,
    title: "Pilotez votre empire",
    subtitle: "Command Center · Analytics IA",
    time: "20h00",
    theme: "Dashboard · Command Center",
    accentColor: "blue",
    accentHex: "#006AC9",
    description: "Tableaux de bord temps réel, prédictions IA, rapports automatiques pour toute votre agence.",
    kpiLabel: "Chiffre d'affaires suivi",
    kpiValue: "€2.4M",
  },
]

export const ZONE_BOUNDARIES = [0, 0.13, 0.25, 0.38, 0.50, 0.63, 0.75, 0.88, 1.0]
