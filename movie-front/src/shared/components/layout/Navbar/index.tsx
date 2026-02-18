// Barre de navigation globale : logo, recherche, auth. Menu hamburger sur mobile.
import { useState, useEffect } from 'react';
import { Search, User as UserIcon, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../features/auth/hooks/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setMenuOpen(false);

  const authenticated = isAuthenticated();

  // Bloquer le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const searchBlock = (
    <div className="relative flex min-w-0 flex-1 items-center sm:max-w-md">
      <input
        className="h-10 w-full rounded-full border-2 border-quaternary pl-3 pr-10 text-sm sm:h-11 sm:border-4"
        type="text"
        placeholder="Rechercher un film..."
      />
      <Search
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
        size={18}
      />
    </div>
  );

  const authBlock = (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {!authenticated ? (
        <>
          <Link
            to="/login"
            onClick={closeMenu}
            className="flex h-10 flex-1 items-center justify-center rounded-lg border-2 border-quaternary bg-secondary text-white text-sm sm:h-11 sm:flex-none sm:w-32 sm:border-4"
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={closeMenu}
            className="flex h-10 flex-1 items-center justify-center rounded-lg border-2 border-quaternary bg-tertiary text-white text-sm sm:h-11 sm:flex-none sm:w-32 sm:border-4"
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 rounded-full bg-secondary/70 px-3 py-1.5 text-white">
            <UserIcon className="h-5 w-5 shrink-0" aria-hidden />
            <span className="truncate text-sm max-w-[120px] sm:max-w-[160px]">
              {user?.name}
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="h-10 rounded-lg border-2 border-quaternary bg-tertiary px-4 text-sm text-white sm:h-11 sm:border-4"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );

  return (
    <nav className="w-full overflow-x-hidden">
      {/* Barre principale */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center" onClick={closeMenu}>
          <img
            className="h-8 w-auto max-w-[180px] sm:h-10 sm:max-w-xs md:h-12"
            src="src/assets/title.png"
            alt="Accueil"
          />
        </Link>

        {/* Desktop : recherche + auth (caché sur mobile) */}
        <div className="hidden flex-1 items-center justify-center gap-4 md:flex">
          {searchBlock}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {authBlock}
        </div>

        {/* Mobile : bouton hamburger (visible uniquement < md) */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-quaternary text-white md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Menu className="h-6 w-6" aria-hidden />
          )}
        </button>
      </div>

      {/* Menu mobile : overlay + panneau */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMenu}
        />

        {/* Panneau vertical */}
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col gap-6 bg-primary p-6 shadow-xl transition-transform duration-200 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
              aria-label="Fermer le menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {searchBlock}
            {authBlock}
          </div>
        </div>
      </div>
    </nav>
  );
};
