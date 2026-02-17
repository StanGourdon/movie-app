// Appels API films : getMovies, getMovieById, rateMovie, etc. Utilise l'instance axios du config.

import { api } from "../../../config/api"
import type {
  Movie,
  PaginatedResponse,
  RateMovieRequest,
  MovieDetail
} from "../types/movie.types"

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

  async rateMovie(id: number, data: RateMovieRequest): Promise<{ message: string, movie_id: number }> {
          const response = await api.post<{ message: string, movie_id: number }>(
          `/movies/${id}/rate`,
          data
      );
    return response.data;
  }
}
