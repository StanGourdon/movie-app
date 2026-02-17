// Appels API films : getMovies, getMovieById, rateMovie, etc. Utilise l'instance axios du config.

import { api } from "../../../config/api"
import type { Movie, PaginatedResponse, MovieDetail } from '../types/movie.types';

export interface RateMovieResponse {
  message: string;
  movie_id: number;
}

export const moviesApi = {
  async getMovies(page: number): Promise<PaginatedResponse<Movie>> {
    const response = await api.get<PaginatedResponse<Movie>>('/movies', {
      params: { page },
    });
    return response.data;
  },

  async getMovieById(id: number): Promise<MovieDetail> {
    const response = await api.get<{ data: MovieDetail }>(`/movies/${id}`);
    return response.data.data;
  },

  async rateMovie(
    movieId: number,
    payload: { rating: number; comment?: string }
  ): Promise<RateMovieResponse> {
    const response = await api.post<RateMovieResponse>(`/movies/${movieId}/rate`, payload);
    return response.data;
  },
}
