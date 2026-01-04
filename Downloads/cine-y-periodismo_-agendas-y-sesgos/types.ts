export interface MovieCharacter {
  id: number;
  tmdbId: number; // Real TMDB movie ID
  title: string;
  year: string;
  characters: string[];
  relevance: string;
  category: 'hero' | 'villain' | 'complex';
  posterPath?: string; // Will be fetched from TMDB
  rating?: number;
  overview?: string;
}

export interface ThemeStat {
  name: string;
  count: number;
}

export interface ImpactData {
  movie: string;
  impact: string;
  examples: string;
}

export interface CensorshipItem {
  title: string;
  desc: string;
}

export interface CategoryStat {
  name: string;
  value: number;
  color: string;
}

export interface DecadeStat {
  decade: string;
  hero: number;
  villain: number;
  complex: number;
}