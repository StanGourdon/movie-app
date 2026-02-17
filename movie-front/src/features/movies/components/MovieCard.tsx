import type { Movie } from '../types/movie.types';

const MAX_STARS = 5;

function StarRating({ rating }: { rating: number }) {
  const value = Math.min(MAX_STARS, Math.max(0, Math.round(rating)));
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${value} sur ${MAX_STARS}`}>
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <span
          key={i}
          className={i < value ? 'text-amber-400' : 'text-gray-300'}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

export interface MovieCardProps {
  movie: Movie;
  onSelect: () => void;
}

export const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  return (
    <article className="bg-white/95 rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="aspect-[2/3] bg-gray-200 overflow-hidden">
        <img
          src={movie.poster_url ?? 'https://via.placeholder.com/300x450?text=No+poster'}
          alt={`Affiche de ${movie.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-10">
          {movie.title}
        </h3>
        <div className="mt-1">
          <StarRating rating={movie.average_rating} />
        </div>
        <button
          type="button"
          onClick={onSelect}
          className="mt-3 w-full py-2 px-3 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Consulter
        </button>
      </div>
    </article>
  );
};
