// Page d'accueil : layout avec Navbar, grille de films (MovieGrid), modales (détail film, ajout commentaire), Footer.
import { useMovies } from "../../features/movies/hooks/useMovies"
import { MovieGrid } from '../../features/movies/components/MovieGrid';
import castle from '../../assets/castle.jpg';

export const HomePage = () => {
  const { movies, loading, error, currentPage, lastPage, setPage } = useMovies();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center pt-8 px-14"
      style={{ backgroundImage: `url(${castle})` }}
    >
      <h1 className="text-white text-2xl">
        Découvrez notre collection de films Disney classiques et partagez vos avis
      </h1>
      <MovieGrid
        movies={movies}
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={setPage}
      />
    </div>
  );
};