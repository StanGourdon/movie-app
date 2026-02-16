import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import type { Movie, MovieDetail, PaginatedResponse } from '../types/movie';

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    lastPage: number;
    total: number;
    perPage: number;
  } | null;
  fetchMovies: (page?: number) => Promise<void>;
  refreshMovies: () => Promise<void>;
}

export const useMovies = (initialPage: number = 1): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UseMoviesReturn['pagination']>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const fetchMovies = useCallback(async (page: number = currentPage) => {
    try {
      setLoading(true);
      setError(null);
      const response: PaginatedResponse<Movie> = await apiService.getMovies(page);
      setMovies(response.data);
      setPagination({
        currentPage: response.current_page,
        lastPage: response.last_page,
        total: response.total,
        perPage: response.per_page,
      });
      setCurrentPage(response.current_page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des films');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const refreshMovies = useCallback(async () => {
    await fetchMovies(currentPage);
  }, [fetchMovies, currentPage]);

  useEffect(() => {
    fetchMovies(initialPage);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    movies,
    loading,
    error,
    pagination,
    fetchMovies,
    refreshMovies,
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
      const data = await apiService.getMovieById(movieId);
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
