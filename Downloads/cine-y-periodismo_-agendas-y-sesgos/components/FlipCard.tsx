import React, { useState, useEffect } from 'react';
import { MovieCharacter } from '../types';
import { Film, User, Star, RotateCw, ImageOff, Loader2 } from 'lucide-react';
import { getMovieById, getPosterUrl, TMDBMovie } from '../services/tmdbService';

interface FlipCardProps {
  movie: MovieCharacter;
}

export const FlipCard: React.FC<FlipCardProps> = ({ movie }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tmdbData, setTmdbData] = useState<TMDBMovie | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      const data = await getMovieById(movie.tmdbId);
      setTmdbData(data);
      setLoading(false);
    };

    fetchMovieData();
  }, [movie.tmdbId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const posterUrl = tmdbData?.poster_path ? getPosterUrl(tmdbData.poster_path, 'w500') : null;

  // Determine border color based on category
  const getBorderColor = () => {
    switch (movie.category) {
      case 'hero': return 'border-blue-500/60 shadow-blue-500/30';
      case 'villain': return 'border-red-500/60 shadow-red-500/30';
      default: return 'border-amber-500/60 shadow-amber-500/30';
    }
  };

  const getCategoryBadge = () => {
    switch (movie.category) {
      case 'hero': return { bg: 'bg-blue-500/20', text: 'text-blue-300', label: 'Héroe' };
      case 'villain': return { bg: 'bg-red-500/15', text: 'text-red-400/80', label: 'Crítica' };
      default: return { bg: 'bg-amber-500/20', text: 'text-amber-300', label: 'Complejo' };
    }
  };

  const badge = getCategoryBadge();

  return (
    <div
      className="group w-full h-[420px] perspective-1000 cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front Side */}
        <div className={`absolute w-full h-full backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 ${getBorderColor()} shadow-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300`}>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-10 h-10 text-slate-400 animate-spin mb-4" />
              <span className="text-slate-500 text-sm">Cargando...</span>
            </div>
          ) : posterUrl && !imageError ? (
            <>
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />

              {/* Rating Badge */}
              {tmdbData?.vote_average && (
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-amber-100 font-bold text-sm">{tmdbData.vote_average.toFixed(1)}</span>
                </div>
              )}

              {/* Category Badge */}
              <div className={`absolute top-4 right-12 ${badge.bg} backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10`}>
                <span className={`${badge.text} font-medium text-xs uppercase tracking-wide`}>{badge.label}</span>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-5 text-left">
                <h3 className="serif text-2xl font-bold text-white drop-shadow-lg leading-tight mb-1">{movie.title}</h3>
                <span className="text-slate-300 font-mono text-sm drop-shadow-md">{movie.year}</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-gradient-to-br from-slate-800 to-slate-900">
              {imageError ? <ImageOff className="w-16 h-16 text-slate-600 mb-4" /> : <Film className="w-16 h-16 text-slate-400 mb-4" />}
              <h3 className="serif text-2xl font-bold text-slate-100 mb-2">{movie.title}</h3>
              <span className="text-slate-400 font-mono text-sm">{movie.year}</span>
              <div className={`mt-4 ${badge.bg} px-4 py-2 rounded-full`}>
                <span className={`${badge.text} font-medium text-sm`}>{badge.label}</span>
              </div>
            </div>
          )}

          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-slate-300 z-10 border border-white/10 group-hover:rotate-180 transition-transform duration-500">
            <RotateCw size={14} />
          </div>
        </div>

        {/* Back Side */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl p-6 flex flex-col justify-between overflow-hidden`}>
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/3 to-transparent rounded-tr-full pointer-events-none" />

          <div className="overflow-y-auto custom-scrollbar pr-2 relative z-10">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
              <h3 className="serif text-xl font-bold text-slate-100">{movie.title}</h3>
              <div className={`${badge.bg} px-3 py-1 rounded-full`}>
                <span className={`${badge.text} font-medium text-xs`}>{badge.label}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3 text-slate-300">
              <User size={16} className="text-blue-400" />
              <span className="font-bold text-xs uppercase tracking-wider">Personajes</span>
            </div>
            <ul className="text-sm text-slate-400 mb-5 space-y-1.5">
              {movie.characters.map((char, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50"></span>
                  {char}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 mb-2 text-amber-500">
              <Star size={16} className="fill-amber-500" />
              <span className="font-bold text-xs uppercase tracking-wider">Relevancia</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic bg-slate-800/50 p-3 rounded-lg border-l-2 border-amber-500/50">
              "{movie.relevance}"
            </p>

            {tmdbData?.overview && (
              <div className="mt-4">
                <p className="text-xs text-slate-500 line-clamp-3">{tmdbData.overview}</p>
              </div>
            )}
          </div>

          <div className="text-xs text-slate-600 text-center pt-3 border-t border-slate-800 mt-2 relative z-10">
            <span className="bg-gradient-to-r from-amber-500/20 to-blue-500/20 px-4 py-1 rounded-full">
              Agendas y Sesgos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};