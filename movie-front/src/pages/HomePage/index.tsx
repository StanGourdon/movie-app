// Page d'accueil : layout avec Navbar, grille de films (MovieGrid), modales (détail film, ajout commentaire), Footer.
import { MovieGrid } from '../../features/movies/components/MovieGrid';
import { Navbar } from '../../shared/components/layout/Navbar'; 
import { Footer } from '../../shared/components/layout/Footer';

export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <MovieGrid />
      <Footer />
    </div>
  );
};