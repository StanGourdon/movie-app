// Barre de navigation globale : logo, recherche, liens auth.
import { Search, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../features/auth/hooks/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const authenticated = isAuthenticated();

  return (
    <div className="flex h-full">
      <div className="mx-16 flex w-full self-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-[77px] w-[382px]"
            src="src/assets/title.png"
            alt="Accueil"
          />
        </Link>

        <div className="relative flex items-center">
          <input
            className="h-12 w-96 rounded-full border-4 border-quaternary p-3"
            type="text"
            placeholder="Rechercher un film..."
          />
          <Search
            className="
              absolute 
              right-4 
              top-1/2 
              -translate-y-1/2 
              text-gray-600
            "
            size={20}
          />
        </div>

        <div className="flex w-72 items-center justify-between">
          {!authenticated ? (
            <>
              <Link
                to="/login"
                className="flex h-12 w-32 items-center justify-center rounded-lg border-4 border-quaternary bg-secondary text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex h-12 w-32 items-center justify-center rounded-lg border-4 border-quaternary bg-tertiary text-white"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center text-white">
                <UserIcon className="h-6 w-6" aria-hidden />
              </div>
              <div className="flex items-center justify-center">
                <span className="text-white">
                  {user?.name}
                </span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="h-12 w-32 rounded-lg border-4 border-quaternary bg-tertiary text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};