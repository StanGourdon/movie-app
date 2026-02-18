# Arborescence `/src` – React 19 + TypeScript + Vite + Tailwind

Structure **feature-based** avec séparation des domaines **auth** et **movies**. Scalable et maintenable.

---

## Arborescence complète

```
src/
├── app/
│   ├── App.tsx              # Point d'entrée : BrowserRouter, layout (header, main, footer)
│   └── router.tsx           # Routes (Routes + Route) : /, /login, /register, /account
│
├── assets/
│   └── react.svg            # Assets statiques (images, etc.)
│
├── config/
│   └── api.ts               # Instance Axios (baseURL), intercepteurs (token, 401)
│
├── features/
│   ├── auth/                        # Domaine : authentification
│   │   ├── components/
│   │   │   ├── ErrorMessage.tsx     # Affichage des erreurs (auth)
│   │   │   ├── LoadingSpinner.tsx   # Indicateur de chargement (auth)
│   │   │   ├── LoginForm.tsx        # Formulaire de connexion
│   │   │   └── RegisterForm.tsx     # Formulaire d'inscription
│   │   ├── hooks/
│   │   │   └── useAuth.ts           # Hook : user, token, login, register, logout, isAuthenticated
│   │   ├── services/
│   │   │   └── authApi.ts           # Appels API : login, register, logout, getUser
│   │   └── types/
│   │       └── auth.types.ts        # User, LoginRequest, RegisterRequest, AuthResponse
│   │
│   └── movies/                      # Domaine : films
│       ├── components/
│       │   ├── MovieGrid.tsx        # Grille responsive + pagination + modales
│       │   ├── MovieCard.tsx        # Carte film (poster, titre, note, bouton Consulter)
│       │   ├── MovieDetailModal.tsx # Modal détail film (description, commentaires)
│       │   └── AddCommentModal.tsx  # Modal notation/commentaire (rateMovie)
│       ├── hooks/
│       │   └── useMovies.ts          # useMovies (liste, pagination), useMovieDetail (détail, refresh)
│       ├── services/
│       │   └── moviesApi.ts         # getMovies, getMovieById, rateMovie
│       ├── types/
│       │   └── movie.types.ts       # Movie, MovieDetail, Comment, PaginatedResponse, etc.
│       └── index.ts                 # Barrel (réexport feature movies)
│
├── pages/
│   ├── HomePage/
│   │   └── index.tsx        # Page d'accueil (MovieGrid, useMovies, pagination)
│   ├── LoginPage/
│   │   └── index.tsx        # Page connexion (LoginForm, useAuth, redirection /)
│   ├── RegisterPage/
│   │   └── index.tsx        # Page inscription (RegisterForm, useAuth, redirection /)
│   └── AccountPage/
│       └── index.tsx        # Page compte utilisateur
│
├── shared/
│   └── components/
│       ├── layout/
│       │   ├── Navbar/
│       │   │   └── index.tsx        # Barre de navigation (logo, recherche, auth, menu hamburger mobile)
│       │   ├── Main/
│       │   │   └── index.tsx        # Wrapper main (background, padding)
│       │   └── Footer/
│       │       └── index.tsx        # Pied de page (colonnes, liens, icônes sociales)
│       └── ui/
│           └── Modal/
│               └── index.tsx        # Modal réutilisable (overlay, fermeture)
│
├── index.css                # Styles globaux (Tailwind)
├── main.tsx                 # Bootstrap React (render App)
├── vite-env.d.ts            # Types Vite + variables d'environnement
└── STRUCTURE.md             # Ce fichier
```

---

## Rôle des dossiers

| Dossier / Fichier | Rôle |
|-------------------|------|
| **app/** | Point d'entrée : `App.tsx` (BrowserRouter, header/main/footer), `router.tsx` (Routes). |
| **config/** | Configuration : instance Axios, `API_ENDPOINTS`, intercepteurs (Authorization Bearer, 401 → suppression token). |
| **features/auth/** | Authentification : formulaires Login/Register, `useAuth`, `authApi`, types. |
| **features/movies/** | Films : grille, cartes, modales détail/commentaire, `useMovies` / `useMovieDetail`, `moviesApi`, pagination. |
| **pages/** | Une page = une route. Compose layout + features (HomePage, LoginPage, RegisterPage, AccountPage). |
| **shared/components/** | Composants partagés : layout (Navbar, Main, Footer), UI (Modal). |

---

## Séparation des domaines métier

- **auth** : login, register, logout, token (localStorage), user, formulaires et hooks dédiés.
- **movies** : liste paginée, détail film, notation/commentaire (API protégée), modales.
- Chaque feature est autonome : `components/`, `services/`, `types/`, `hooks/`, et éventuellement barrel `index.ts`.

---

## Routing et flux

- **App** : `BrowserRouter` englobe toute l’app (Navbar a accès à `useNavigate`).
- **Routes** : `/` (HomePage), `/login` (LoginPage), `/register` (RegisterPage), `/account` (AccountPage, si activée).
- **Axios** : instance dans `config/api.ts` ; token ajouté via intercepteur ; 401 → suppression du token.
- **Types** : par feature dans `types/`. `vite-env.d.ts` pour les variables d’environnement.
