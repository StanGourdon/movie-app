import { useState, useEffect, useCallback } from 'react';
import type { Movie, MovieDetail, PaginatedResponse } from '../types/movie.types';
import { moviesApi } from '../services/moviesApi';

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  lastPage: number;
  setPage: (page: number) => void;
}

export const useMovies = (initialPage: number = 1): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [lastPage, setLastPage] = useState<number>(1);

  const fetchMovies = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response: PaginatedResponse<Movie> = await moviesApi.getMovies(page);
      setMovies(response.data);
      setCurrentPage(response.meta.current_page);
      setLastPage(response.meta.last_page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des films');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, fetchMovies]);

  return {
    movies,
    loading,
    error,
    currentPage,
    lastPage,
    setPage: setCurrentPage,
  };
};

interface UseMovieDetailReturn {
  fullMovie: MovieDetail | null;
  loadingDetail: boolean;
  errorDetail: string | null;
  selectMovie: (id: number) => Promise<void>;
  refreshMovie: (id: number) => Promise<void>;
  clearSelection: () => void;
}

/**
 * Gestion du chargement des détails d'un film.
 * - Chargement uniquement à l'ouverture
 * - Pas de rechargement si on ré-ouvre le même film
 */
export const useMovieDetail = (): UseMovieDetailReturn => {
  const [fullMovie, setFullMovie] = useState<MovieDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const selectMovie = useCallback(async (id: number) => {
    // Si on a déjà les détails pour ce film, ne pas recharger
    if (fullMovie && fullMovie.id === id) {
      return;
    }

    try {
      setLoadingDetail(true);
      setErrorDetail(null);
      const data = await moviesApi.getMovieById(id);
      setFullMovie(data);
    } catch (err) {
      setErrorDetail(
        err instanceof Error ? err.message : 'Erreur lors du chargement du film'
      );
      setFullMovie(null);
    } finally {
      setLoadingDetail(false);
    }
  }, [fullMovie]);

  const refreshMovie = useCallback(async (id: number) => {
    try {
      setLoadingDetail(true);
      setErrorDetail(null);
      const data = await moviesApi.getMovieById(id);
      setFullMovie(data);
    } catch (err) {
      setErrorDetail(
        err instanceof Error ? err.message : 'Erreur lors du chargement du film'
      );
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  const clearSelection = useCallback(() => {
    setErrorDetail(null);
  }, []);

  return {
    fullMovie,
    loadingDetail,
    errorDetail,
    selectMovie,
    refreshMovie,
    clearSelection,
  };
};
