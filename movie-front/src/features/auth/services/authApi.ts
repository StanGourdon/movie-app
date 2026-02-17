import { api, API_ENDPOINTS } from '../../../config/api';
import type { AuthResponse, LoginRequest, RegisterRequest, User } from '../types/auth.types';

class AuthApi {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.auth.login, credentials);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  }

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(API_ENDPOINTS.auth.register, payload);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post(API_ENDPOINTS.auth.logout);
    localStorage.removeItem('auth_token');
  }

  async getUser(): Promise<User> {
    const response = await api.get<User>(API_ENDPOINTS.auth.me);
    return response.data;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

export const authApi = new AuthApi();