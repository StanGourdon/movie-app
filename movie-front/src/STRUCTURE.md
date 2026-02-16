# Arborescence `/src` – React 19 + TypeScript + Vite + Tailwind

Structure **feature-based** avec séparation claire des domaines métier **auth** et **movies**. Scalable et maintenable.

---

## Arborescence complète

```
src/
├── app/
│   ├── App.tsx              # Point d'entrée : providers + routeur
│   └── router.tsx           # Définition des routes (HomePage, AccountPage)
│
├── assets/
│   └── react.svg
│
├── config/
│   └── api.ts               # Instance Axios (baseURL, intercepteurs)
│
├── features/
│   ├── auth/                        # Domaine métier : authentification
│   │   ├── components/
│   │   │   ├── ErrorMessage.tsx     # Affichage des erreurs (auth)
│   │   │   └── LoadingSpinner.tsx   # Indicateur de chargement (auth)
│   │   ├── services/
│   │   │   └── authApi.ts           # Appels API auth (login, logout)
│   │   └── types/
│   │       └── auth.types.ts        # Types User, LoginResponse, etc.
│   │
│   └── movies/                      # Domaine métier : films
│       ├── components/
│       │   ├── MovieGrid.tsx        # Grille de cartes films
│       │   ├── MovieCard.tsx        # Carte film (poster, titre, note)
│       │   ├── MovieDetailModal.tsx # Modal détail film
│       │   └── AddCommentModal.tsx  # Modal ajout commentaire
│       ├── hooks/
│       │   └── useMovies.ts         # Hooks liste, détail, pagination, actions
│       ├── services/
│       │   └── moviesApi.ts         # Appels API films (axios)
│       ├── types/
│       │   └── movie.types.ts       # Types Movie, MovieDetail, etc.
│       └── index.ts                 # Barrel (réexport feature movies)
│
├── pages/
│   ├── HomePage/
│   │   └── index.tsx        # Page d'accueil (Navbar, MovieGrid, modales, Footer)
│   └── AccountPage/
│       └── index.tsx        # Page compte utilisateur
│
├── shared/
│   └── components/
│       ├── layout/
│       │   ├── Navbar/
│       │   │   └── index.tsx        # Barre de navigation globale
│       │   └── Footer/
│       │       └── index.tsx        # Pied de page global
│       └── ui/
│           └── Modal/
│               └── index.tsx        # Modal réutilisable (overlay, fermeture)
│
├── App.css
├── index.css                # Styles globaux (Tailwind)
├── main.tsx                 # Bootstrap React (render App)
├── vite-env.d.ts            # Types Vite + variables d'environnement
└── STRUCTURE.md             # Ce fichier
```

---

## Rôle des dossiers

| Dossier / Fichier | Rôle |
|-------------------|------|
| **app/** | Point d'entrée de l'app : `App`, routeur. |
| **config/** | Configuration (instance Axios, baseURL, intercepteurs). |
| **features/auth/** | Domaine authentification : login, logout, erreurs, chargement. |
| **features/movies/** | Domaine films : grille, cartes, modales, API, hooks. |
| **pages/** | Une page = une route. Compose layout + features. |
| **shared/components/** | Composants réutilisables (layout, UI). |

---

## Séparation des domaines métier

- **auth** : tout ce qui concerne l'authentification (services, types, composants d'état comme LoadingSpinner, ErrorMessage).
- **movies** : tout ce qui concerne les films (liste, détail, modales, commentaires, notes).
- Chaque feature est autonome : `components/`, `services/`, `types/`, et éventuellement `hooks/` et un barrel `index.ts`.

---

## Routing, Axios, types

- **Routing** : `app/router.tsx` définit les routes ; `app/App.tsx` rend le routeur.
- **Axios** : instance unique dans `config/api.ts`. Les features l'utilisent via leurs `services/*` respectifs.
- **Types** : chaque feature possède ses types dans `types/`. `vite-env.d.ts` pour les variables d'environnement.
