import { useNavigate, Link } from 'react-router-dom';
import { RegisterForm } from '../../features/auth/components/RegisterForm';
import { useAuth } from '../../features/auth/hooks/useAuth';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error, isAuthenticated } = useAuth();

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    const ok = await register(values);
    if (ok) {
      navigate('/');
    }
  };

  if (isAuthenticated()) {
    navigate('/');
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-4 bg-gray-50 px-4 rounded-lg shadow-md border-4 border-quaternary">
        <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} />
        <p className="text-center text-sm text-gray-600">
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

