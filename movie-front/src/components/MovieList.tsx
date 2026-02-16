import { useMovies } from '../hooks/useMovies';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const MovieList = () => {
  const { movies, loading, error, pagination, fetchMovies } = useMovies();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Aucun film disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {pagination && pagination.lastPage > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => fetchMovies(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Précédent
          </button>
          <span className="text-gray-600">
            Page {pagination.currentPage} sur {pagination.lastPage}
          </span>
          <button
            onClick={() => fetchMovies(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.lastPage}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
