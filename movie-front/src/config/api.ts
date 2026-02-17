import axios from "axios"
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/movie-app/movie-back/public/api';

export const API_ENDPOINTS = {
  movies: {
    list: '/movies',
    detail: (id: number) => `/movies/${id}`,
    rate: (id: number) => `/movies/${id}/rate`,
  },
  auth: {
    login: '/login',
    logout: '/logout',
  },
} as const;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})