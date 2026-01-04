import { MovieCharacter, ThemeStat, ImpactData, CensorshipItem, CategoryStat, DecadeStat } from './types';

// Using real TMDB IDs for each movie
export const topCharacters: MovieCharacter[] = [
  {
    id: 1,
    tmdbId: 15, // Citizen Kane
    title: "Citizen Kane",
    year: "1941",
    characters: ["Charles Foster Kane", "Jerry Thompson"],
    relevance: "Representación más compleja del periodismo. Magnate inspirado en Hearst.",
    category: 'villain'
  },
  {
    id: 2,
    tmdbId: 891, // All The President's Men
    title: "All The President's Men",
    year: "1976",
    characters: ["Bob Woodward", "Carl Bernstein", "Ben Bradlee"],
    relevance: "Caso Watergate, protección de fuentes. El periodismo como pilar democrático.",
    category: 'hero'
  },
  {
    id: 3,
    tmdbId: 314365, // Spotlight
    title: "Spotlight",
    year: "2015",
    characters: ["Marty Baron", "Equipo Spotlight"],
    relevance: "Abusos sexuales sacerdotes, trabajo colectivo y metódico.",
    category: 'hero'
  },
  {
    id: 4,
    tmdbId: 446354, // The Post
    title: "The Post",
    year: "2017",
    characters: ["Kay Graham", "Ben Bradlee"],
    relevance: "Papeles del Pentágono, libertad de prensa y mujeres en el poder.",
    category: 'hero'
  },
  {
    id: 5,
    tmdbId: 263, // La dolce vita (correct ID)
    title: "La dolce vita",
    year: "1960",
    characters: ["Marcello", "Paparazzo"],
    relevance: "Origen del término 'paparazzi'. Ética vs. farándula.",
    category: 'complex'
  },
  {
    id: 6,
    tmdbId: 11700, // Network
    title: "Network",
    year: "1976",
    characters: ["Howard Beale", "Diana Christensen"],
    relevance: "Información como espectáculo. Crítica a la TV sensacionalista.",
    category: 'villain'
  },
  {
    id: 7,
    tmdbId: 1949, // Zodiac
    title: "Zodiac",
    year: "2007",
    characters: ["Robert Graysmith", "Paul Avery"],
    relevance: "Investigación mediática obsesiva que enfrenta el fracaso.",
    category: 'complex'
  },
  {
    id: 8,
    tmdbId: 1367, // Good Night, and Good Luck
    title: "Good Night, and Good Luck",
    year: "2005",
    characters: ["Edward R. Murrow", "Fred Friendly"],
    relevance: "Enfrentamiento al senador McCarthy. Censura y Guerra Fría.",
    category: 'hero'
  },
  {
    id: 9,
    tmdbId: 12102, // Frost/Nixon
    title: "Frost/Nixon",
    year: "2008",
    characters: ["David Frost", "Richard Nixon"],
    relevance: "El duelo entre periodismo y poder político.",
    category: 'complex'
  },
  {
    id: 10,
    tmdbId: 598, // Cidade de Deus (City of God)
    title: "Cidade de Deus",
    year: "2002",
    characters: ["Buscapé"],
    relevance: "Violencia en favelas, dilemas morales y la fotografía como escape.",
    category: 'complex'
  }
];

export const themeStats: ThemeStat[] = [
  { name: "Mujer periodista", count: 941 },
  { name: "Diario", count: 557 },
  { name: "Editor", count: 427 },
  { name: "Periodista detective", count: 389 },
  { name: "TV", count: 382 },
  { name: "Investigación asesinato", count: 299 },
  { name: "Corresponsal intl.", count: 271 },
  { name: "Guerra", count: 245 },
  { name: "Escándalo político", count: 198 },
  { name: "Censura", count: 156 },
];

// Category distribution for pie chart
export const categoryStats: CategoryStat[] = [
  { name: "Héroe", value: 4, color: "#3b82f6" },
  { name: "Crítica", value: 2, color: "#ef4444" },
  { name: "Complejo", value: 4, color: "#f59e0b" },
];

// Decade distribution for timeline
export const decadeStats: DecadeStat[] = [
  { decade: "1940s", hero: 0, villain: 1, complex: 0 },
  { decade: "1960s", hero: 0, villain: 0, complex: 1 },
  { decade: "1970s", hero: 1, villain: 1, complex: 0 },
  { decade: "2000s", hero: 1, villain: 0, complex: 2 },
  { decade: "2010s", hero: 2, villain: 0, complex: 1 },
];

export const censorshipItems: CensorshipItem[] = [
  { title: "Good Night, and Good Luck", desc: "Murrow vs. McCarthy, programa desplazado por mercadotecnia." },
  { title: "Garras de oro", desc: "Crítica a intervención USA en Panamá, censurada por diplomáticos." },
  { title: "June Bride", desc: "Cierre de redacción por falta de noticias no censuradas post-guerra." },
  { title: "Unsilenced", desc: "Periodista vs. censura del Partido Comunista Chino." },
  { title: "Navajeros", desc: "Dictadura franquista, enfrentamientos con censores." },
  { title: "Three Kings", desc: "Control militar sobre prensa en Guerra del Golfo." }
];

export const impactData: ImpactData[] = [
  { movie: "Citizen Kane", impact: "Manipulación política", examples: "Muestra medios creando 'verdad' para masas." },
  { movie: "All the President's Men", impact: "Escándalos presidenciales", examples: "Heroísmo periodístico como pilar democrático." },
  { movie: "Network", impact: "Sensacionalismo TV", examples: "Explotación de crisis para ratings." },
  { movie: "Good Night, and Good Luck", impact: "Censura Guerra Fría", examples: "Prensa vs. represión ideológica." },
  { movie: "Spotlight", impact: "Abusos institucionales", examples: "Revela encubrimientos sistémicos." },
];

export const realWorldImpact: ImpactData[] = [
  { movie: "All the President's Men", impact: "Renuncia Nixon; leyes prensa", examples: "Investigaciones anticorrupción mundial." },
  { movie: "Spotlight", impact: "Reformas Iglesia Católica", examples: "Comisiones abusos en 20+ países." },
  { movie: "Good Night, and Good Luck", impact: "Declive McCarthy", examples: "Normas anti-censura y acceso a info." },
  { movie: "Network", impact: "Críticas regulación TV", examples: "Debates actuales sobre fake news." },
  { movie: "Citizen Kane", impact: "Estándares éticos", examples: "Influencia anti-monopolio global." },
];

// Radar chart data for thematic analysis
export const thematicRadarData = [
  { subject: 'Investigación', A: 85, fullMark: 100 },
  { subject: 'Ética', A: 72, fullMark: 100 },
  { subject: 'Poder', A: 90, fullMark: 100 },
  { subject: 'Verdad', A: 78, fullMark: 100 },
  { subject: 'Censura', A: 65, fullMark: 100 },
  { subject: 'Corrupción', A: 82, fullMark: 100 },
];