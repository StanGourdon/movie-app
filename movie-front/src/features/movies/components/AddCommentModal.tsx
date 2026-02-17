import { useState } from 'react';
import { moviesApi } from '../services/moviesApi';

export interface AddCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: number | null;
  onSuccess?: () => void;
}

export const AddCommentModal = ({
  isOpen,
  onClose,
  movieId,
  onSuccess,
}: AddCommentModalProps) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState<number>(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setContent('');
    setRating(3);
    setError(null);
  };

  const handleClose = () => {
    if (!loading) {
      resetForm();
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (movieId == null) return;

    setLoading(true);
    setError(null);

    try {
      await moviesApi.rateMovie(movieId, {
        rating,
        comment: content.trim() || undefined,
      });
      resetForm();
      onClose();
      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur lors de l’envoi de la notation.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-comment-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        onKeyDown={(e) => e.key === 'Escape' && handleClose()}
        aria-hidden
      />
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <h2 id="add-comment-title" className="text-lg font-bold text-gray-900 mb-4">
          Ajouter un commentaire
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Commentaire
            </label>
            <textarea
              id="comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              disabled={loading}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
              placeholder="Votre avis sur le film..."
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
              Note (1 à 5)
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              disabled={loading}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} étoile{n > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="py-2 px-4 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Envoi...
                </>
              ) : (
                'Envoyer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
