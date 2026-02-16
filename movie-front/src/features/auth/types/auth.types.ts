// Types globaux partagés (env, helpers, types communs à plusieurs features).
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  token_type: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
