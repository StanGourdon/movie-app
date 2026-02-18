# Movie Front - React + TypeScript + Tailwind CSS

Application frontend React pour l'application Movie App.

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Ou avec yarn
yarn install
```

## ⚙️ Configuration

1. Copier le fichier `.env.example` vers `.env` :
```bash
cp .env.example .env
```

2. Configurer l'URL de l'API backend dans `.env` :
```
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🏃 Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Ou avec yarn
yarn dev
```

L'application sera accessible sur `http://localhost:5173` (ou le port indiqué par Vite).

## 📦 Build

```bash
# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 🏗️ Structure du projet [STRUCTURE.md](STRUCTURE)

```
src/
├── components/          # Composants React
│   ├── MovieCard.tsx   # Carte d'un film
│   ├── MovieList.tsx   # Liste des films
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── config/             # Configuration
│   └── api.ts         # Configuration API et endpoints
├── hooks/             # Hooks React personnalisés
│   └── useMovies.ts   # Hook pour gérer les films
├── services/          # Services API
│   └── api.ts        # Service API avec axios
├── types/            # Types TypeScript
│   └── movie.ts      # Types pour les films
└── App.tsx           # Composant principal
```

## 🔌 API

Le service API est configuré dans `src/services/api.ts` et utilise :
- **Axios** pour les requêtes HTTP
- **Intercepteurs** pour gérer l'authentification (token Bearer)
- **Gestion automatique** des erreurs 401 (déconnexion)

### Endpoints disponibles

- `GET /api/movies` - Liste paginée des films
- `GET /api/movies/:id` - Détails d'un film
- `POST /api/movies/:id/rate` - Noter un film (authentification requise)
- `POST /api/login` - Connexion
- `POST /api/logout` - Déconnexion

## 🎨 Tailwind CSS

Tailwind CSS est configuré et prêt à l'emploi. Vous pouvez utiliser toutes les classes Tailwind dans vos composants.

## 📝 Prochaines étapes

1. Installer les dépendances : `npm install`
2. Configurer l'URL de l'API dans `.env`
3. Démarrer le backend Laravel sur `http://localhost:8000`
4. Démarrer le frontend : `npm run dev`
5. Développer l'interface graphique à partir de la maquette Figma
