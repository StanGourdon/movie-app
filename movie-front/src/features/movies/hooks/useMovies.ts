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
  movie: MovieDetail | null;
  loading: boolean;
  error: string | null;
  fetchMovie: () => Promise<void>;
}

export const useMovieDetail = (movieId: number): UseMovieDetailReturn => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await moviesApi.getMovieById(movieId);
      setMovie(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement du film');
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  return {
    movie,
    loading,
    error,
    fetchMovie,
  };
};
