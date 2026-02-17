import { useCallback, useEffect, useState } from 'react';
import { authApi } from '../services/authApi';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../types/auth.types';

interface UseAuthReturn {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (payload: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthSuccess = (data: AuthResponse) => {
    setUser(data.user);
  };

  const login = useCallback(async (credentials: LoginRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.login(credentials);
      handleAuthSuccess(data);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur lors de la connexion.',
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.register(payload);
      handleAuthSuccess(data);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erreur lors de la création du compte.',
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await authApi.logout();
    } catch (err) {
      // On ignore l'erreur de logout côté UI, mais on nettoie tout de même
      console.error(err);
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const bootstrapUser = async () => {
      if (!token || user) return;
      setLoading(true);
      try {
        const me = await authApi.getUser();
        setUser(me);
      } catch (err) {
        // Si le token n'est pas valide, on le supprime
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    void bootstrapUser();
  }, [token, user]);

  const isAuthenticated = useCallback(() => !!token && !!user, [token, user]);

  return {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
  };
};

