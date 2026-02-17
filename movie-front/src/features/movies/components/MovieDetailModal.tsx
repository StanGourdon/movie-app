import type { Movie } from '../types/movie.types';

const MAX_STARS = 5;

function StarRating({ rating }: { rating: number }) {
  const value = Math.min(MAX_STARS, Math.max(0, Math.round(rating)));
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${value} sur ${MAX_STARS}`}>
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <span
          key={i}
          className={i < value ? 'text-amber-400 text-xl' : 'text-gray-300 text-xl'}
          aria-hidden
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-gray-600 text-sm">({rating.toFixed(1)})</span>
    </div>
  );
}

export interface MovieDetailModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
  onAddComment?: () => void;
}

export const MovieDetailModal = ({
  movie,
  isOpen,
  onClose,
  onAddComment,
}: MovieDetailModalProps) => {
  if (!isOpen) return null;

  const description = 'description' in movie ? (movie as Movie & { description?: string | null }).description : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-detail-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        aria-hidden
      />
      <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col sm:flex-row gap-4 p-6">
          <div className="flex-shrink-0 w-full sm:w-48 aspect-[2/3] rounded-lg overflow-hidden bg-gray-200">
            <img
              src={movie.poster_url ?? 'https://via.placeholder.com/300x450?text=No+poster'}
              alt={`Affiche de ${movie.title}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 id="movie-detail-title" className="text-xl font-bold text-gray-900">
              {movie.title}
            </h2>
            {movie.release_date && (
              <p className="text-sm text-gray-500 mt-1">
                {new Date(movie.release_date).getFullYear()}
              </p>
            )}
            <div className="mt-2">
              <StarRating rating={movie.average_rating} />
            </div>
            {description && (
              <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                {description}
              </p>
            )}
            {onAddComment && (
              <button
                type="button"
                onClick={onAddComment}
                className="mt-4 py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Ajouter un commentaire
              </button>
            )}
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
