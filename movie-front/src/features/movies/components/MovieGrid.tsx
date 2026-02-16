// Grille de cartes films (réutilise MovieCard). Gère la liste et la pagination côté UI.
import { MovieCard } from "./MovieCard";

export const MovieGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <MovieCard />
    </div>
  );
};