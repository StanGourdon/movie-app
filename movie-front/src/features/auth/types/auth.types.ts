// Types globaux partagés (env, helpers, types communs à plusieurs features).
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  token_type: string;
  user: User;
}
