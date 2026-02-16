// Appels API films : getMovies, getMovieById, rateMovie, etc. Utilise l'instance axios du config.

import axios, { type AxiosInstance } from "axios";
import type { Movie, MovieDetail, PaginatedResponse, RateMovieRequest } from "../types/movie.types"
import { API_BASE_URL, API_ENDPOINTS } from "../../../config/api.ts";  

class MoviesApi {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  async getMovies(page: number = 1): Promise<PaginatedResponse<Movie>> {
    const response = await this.client.get<PaginatedResponse<Movie>>(
      API_ENDPOINTS.movies.list,
      {
        params: { page },
      }
    );
    return response.data;
  }

  async getMovieById(id: number): Promise<MovieDetail> {
    const response = await this.client.get<MovieDetail>(
      API_ENDPOINTS.movies.detail(id)
    );
    return response.data;
  }

    async rateMovie(id: number, data: RateMovieRequest): Promise<{ message: string, movie_id: number }> {
            const response = await this.client.post<{ message: string, movie_id: number }>(
            API_ENDPOINTS.movies.rate(id),
            data
        );
    return response.data;
  }
}

export const moviesApi = new MoviesApi();