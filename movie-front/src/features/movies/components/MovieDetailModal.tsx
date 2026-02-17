import type { Movie, MovieDetail } from '../types/movie.types';

const MAX_STARS = 5;

function StarRating({ rating }: { rating: number }) {
  const num = Number(rating);
  const value = Math.min(MAX_STARS, Math.max(0, Math.round(Number.isNaN(num) ? 0 : num)));
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
      <span className="ml-2 text-gray-600 text-sm">
        ({Number.isNaN(num) ? '0.0' : num.toFixed(1)})
      </span>
    </div>
  );
}

export interface MovieDetailModalProps {
  movie: Movie | null;
  fullMovie?: MovieDetail | null;
  isOpen: boolean;
  loadingDetail?: boolean;
  onClose: () => void;
  onAddComment?: () => void;
}

export const MovieDetailModal = ({
  movie,
  fullMovie,
  isOpen,
  loadingDetail = false,
  onClose,
  onAddComment,
}: MovieDetailModalProps) => {
  if (!isOpen || !movie) return null;

  const movieToDisplay = (fullMovie ?? movie) as Movie | MovieDetail;
  const description =
    fullMovie && 'description' in fullMovie
      ? (fullMovie as MovieDetail).description ?? null
      : null;

  // Laravel peut renvoyer comments sous la forme { data: [...] } ; sinon tableau ou undefined
  const commentsList = ((): Array<{ id: number; user_name: string; content: string; created_at: string }> => {
    if (!fullMovie) return [];
    const c = fullMovie.comments as unknown;
    if (Array.isArray(c)) return c;
    if (c && typeof c === 'object' && Array.isArray((c as { data?: unknown[] }).data)) {
      return (c as { data: Array<{ id: number; user_name: string; content: string; created_at: string }> }).data;
    }
    return [];
  })();

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
              src={movieToDisplay.poster_url ?? 'https://via.placeholder.com/300x450?text=No+poster'}
              alt={`Affiche de ${movieToDisplay.title}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 id="movie-detail-title" className="text-xl font-bold text-gray-900">
              {movieToDisplay.title}
            </h2>
            {movieToDisplay.release_date && (
              <p className="text-sm text-gray-500 mt-1">
                {new Date(movieToDisplay.release_date).getFullYear()}
              </p>
            )}
            <div className="mt-2">
              <StarRating rating={Number(movieToDisplay.average_rating) || 0} />
            </div>
            {loadingDetail ? (
              <div className="mt-6 flex h-20 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
              </div>
            ) : (
              <>
                {description && (
                  <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                    {description}
                  </p>
                )}

                {commentsList.length > 0 ? (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Commentaires
                    </h3>
                    <ul className="mt-2 space-y-2 text-sm text-gray-700">
                      {commentsList.map((comment) => (
                        <li
                          key={comment.id}
                          className="rounded-md bg-gray-50 px-3 py-2"
                        >
                          <p className="font-medium text-gray-900">
                            {comment.user_name ?? 'Anonyme'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {comment.created_at
                              ? new Date(comment.created_at).toLocaleDateString()
                              : ''}
                          </p>
                          <p className="mt-1 text-gray-700">{comment.content ?? ''}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-gray-500">
                    Aucun commentaire pour le moment.
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
              </>
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
