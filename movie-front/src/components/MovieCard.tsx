import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const formatDate = (date: string | null): string => {
    if (!date) return 'Date inconnue';
    return new Date(date).getFullYear().toString();
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300">☆</span>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => {
        // TODO: Navigation vers la page détail (sera ajouté avec react-router)
        console.log('Navigate to movie:', movie.id);
      }}
    >
      {movie.poster_url ? (
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Pas d'image</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{formatDate(movie.release_date)}</span>
        </div>
        {movie.average_rating > 0 && (
          <div className="mt-2">{renderStars(movie.average_rating)}</div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
