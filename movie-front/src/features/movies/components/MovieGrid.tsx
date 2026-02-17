import { useState } from 'react';
import type { Movie } from '../types/movie.types';
import { MovieCard } from './MovieCard';
import { MovieDetailModal } from './MovieDetailModal';
import { AddCommentModal } from './AddCommentModal';
import { useMovieDetail } from '../hooks/useMovies';

export interface MovieGridProps {
  movies: Movie[];
  currentPage?: number;
  lastPage?: number;
  onPageChange?: (page: number) => void;
}

export const MovieGrid = ({
  movies,
  currentPage = 1,
  lastPage = 1,
  onPageChange,
}: MovieGridProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isAddCommentOpen, setIsAddCommentOpen] = useState(false);

  const { fullMovie, loadingDetail, selectMovie, clearSelection } = useMovieDetail();

  const openDetail = (movie: Movie) => {
    setSelectedMovie(movie);
    void selectMovie(movie.id);
  };

  const closeDetail = () => {
    setSelectedMovie(null);
    clearSelection();
  };
  const openAddComment = () => setIsAddCommentOpen(true);
  const closeAddComment = () => setIsAddCommentOpen(false);

  const showPagination = onPageChange && lastPage > 0;
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < lastPage;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 py-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelect={() => openDetail(movie)}
          />
        ))}
      </div>

      {showPagination && (
        <div className="flex flex-wrap items-center justify-center gap-3 py-6">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!canGoPrev}
            className="px-4 py-2 text-sm font-medium rounded-md bg-white/90 text-gray-800 shadow hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/90"
          >
            Précédent
          </button>

          <label className="flex items-center gap-2 text-sm text-white">
            <span>Page</span>
            <select
              value={currentPage}
              onChange={(e) => onPageChange(Number(e.target.value))}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              aria-label="Choisir la page"
            >
              {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <span>/ {lastPage}</span>
          </label>

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!canGoNext}
            className="px-4 py-2 text-sm font-medium rounded-md bg-white/90 text-gray-800 shadow hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/90"
          >
            Suivant
          </button>
        </div>
      )}

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          fullMovie={fullMovie}
          isOpen={!!selectedMovie}
          loadingDetail={loadingDetail}
          onClose={closeDetail}
          onAddComment={openAddComment}
        />
      )}

      <AddCommentModal isOpen={isAddCommentOpen} onClose={closeAddComment} />
    </>
  );
};
