import { useNavigate, Link } from 'react-router-dom';
import { LoginForm } from '../../features/auth/components/LoginForm';
import { useAuth } from '../../features/auth/hooks/useAuth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const ok = await login(values);
    if (ok) {
      navigate('/');
    }
  };

  if (isAuthenticated()) {
    navigate('/');
  }

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md space-y-4 bg-gray-50 px-4 rounded-lg shadow-md border-4 border-quaternary">
        <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
        <p className="text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

