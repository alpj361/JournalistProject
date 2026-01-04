// TMDB API Service
/// <reference types="vite/client" />
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface TMDBSearchResponse {
  results: TMDBMovie[];
  total_results: number;
}

// Cache for movie data to avoid repeated API calls
const movieCache = new Map<number, TMDBMovie>();

export async function getMovieById(tmdbId: number): Promise<TMDBMovie | null> {
  // Check cache first
  if (movieCache.has(tmdbId)) {
    return movieCache.get(tmdbId)!;
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=es-MX`
    );

    if (!response.ok) {
      console.error(`TMDB API error: ${response.status}`);
      return null;
    }

    const movie: TMDBMovie = await response.json();
    movieCache.set(tmdbId, movie);
    return movie;
  } catch (error) {
    console.error('Error fetching movie from TMDB:', error);
    return null;
  }
}

export async function searchMovie(title: string, year?: string): Promise<TMDBMovie | null> {
  try {
    const yearParam = year ? `&year=${year}` : '';
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}${yearParam}&language=es-MX`
    );

    if (!response.ok) {
      console.error(`TMDB API error: ${response.status}`);
      return null;
    }

    const data: TMDBSearchResponse = await response.json();

    if (data.results.length > 0) {
      const movie = data.results[0];
      movieCache.set(movie.id, movie);
      return movie;
    }

    return null;
  } catch (error) {
    console.error('Error searching movie on TMDB:', error);
    return null;
  }
}

export function getPosterUrl(posterPath: string | null, size: 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string | null {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE}/${size}${posterPath}`;
}

export function getBackdropUrl(backdropPath: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string | null {
  if (!backdropPath) return null;
  return `${TMDB_IMAGE_BASE}/${size}${backdropPath}`;
}

// Pre-fetch multiple movies
export async function prefetchMovies(tmdbIds: number[]): Promise<Map<number, TMDBMovie>> {
  const results = new Map<number, TMDBMovie>();

  await Promise.all(
    tmdbIds.map(async (id) => {
      const movie = await getMovieById(id);
      if (movie) {
        results.set(id, movie);
      }
    })
  );

  return results;
}
