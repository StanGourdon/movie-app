import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import type {
  Movie,
  MovieDetail,
  PaginatedResponse,
  RateMovieRequest,
  LoginRequest,
  LoginResponse,
} from '../types/movie';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Intercepteur pour ajouter le token d'authentification
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur pour gérer les erreurs
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expiré ou invalide
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Movies API
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

  async rateMovie(id: number, data: RateMovieRequest): Promise<void> {
    await this.client.post(API_ENDPOINTS.movies.rate(id), data);
  }

  // Auth API
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>(
      API_ENDPOINTS.auth.login,
      credentials
    );
    // Sauvegarder le token
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  }

  async logout(): Promise<void> {
    await this.client.post(API_ENDPOINTS.auth.logout);
    localStorage.removeItem('auth_token');
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

export const apiService = new ApiService();
