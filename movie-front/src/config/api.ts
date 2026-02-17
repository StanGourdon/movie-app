import axios from 'axios';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost/movie-app/movie-back/public/api';

export const API_ENDPOINTS = {
  movies: {
    list: '/movies',
    detail: (id: number) => `/movies/${id}`,
    rate: (id: number) => `/movies/${id}/rate`,
  },
  auth: {
    login: '/login',
    register: '/register',
    logout: '/logout',
    me: '/user',
  },
} as const;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Intercepteurs : ajout du token + gestion des 401
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // On évite de remplacer l'objet headers (AxiosHeaders) pour rester typé
      if (config.headers) {
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
    }
    return Promise.reject(error);
  },
);