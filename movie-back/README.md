# Movie Back – Laravel 12 + Sanctum

Backend API Laravel pour l’application **Movie App** : films Disney, notes/commentaires, authentification Sanctum.

---

## 🚀 Installation

```bash
cd movie-back

# Installer les dépendances PHP
composer install

# Installer les assets front Laravel si nécessaire
npm install
```

---

## ⚙️ Configuration

1. Copier le fichier d’environnement :

```bash
cp .env.example .env
```

2. Générer la clé d’application :

```bash
php artisan key:generate
```

3. Configurer la connexion à la base de données dans `.env` :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=movie_app
DB_USERNAME=root
DB_PASSWORD=
```

4. (Optionnel) Configurer TMDB dans `config/services.php` et `.env` :

```env
TMDB_BEARER_TOKEN=xxxxxxxx
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_POSTER_PATH=https://image.tmdb.org/t/p/
TMDB_POSTER_SIZE=w500
```

---

## 🗄️ Migrations & seeds

```bash
# Exécuter les migrations
php artisan migrate

# (Optionnel) Seed de base
php artisan db:seed
```

Tables principales :
- `users` : utilisateurs (auth Sanctum).
- `movies` : films importés de TMDB (`tmdb_id`, `title`, `description`, `release_date`, `img_url`).
- `comments`, `likes`, `stars` : commentaires, likes, notes (1–5) associés aux films.
- `personal_access_tokens` : tokens Sanctum.

---

## 🌐 Démarrer le serveur

```bash
php artisan serve
```

L’API sera accessible sur `http://localhost:8000/api` (à faire correspondre avec `VITE_API_BASE_URL` côté front).

---

## 🏗️ Structure du backend

La structure complète est décrite dans [`STRUCTURE.md`](STRUCTURE.md).

Résumé :

- **app/Http/Controllers/Api/**
  - `AuthController` : `login`, `register`, `logout` (Sanctum).
  - `MovieController` : `index` (liste paginée), `show` (détail), `rate` (notation + commentaire).
- **app/Http/Requests/Api/**
  - `RateMovieRequest` : validation `{ rating: number, comment?: string }`.
- **app/Http/Resources/Api/**
  - `MovieResource`, `MovieDetailResource`, `CommentResource`, `StarResource`.
- **app/Models/**
  - `User`, `Movie`, `Comment`, `Like`, `Star`.
- **app/Services/**
  - `TmdbService` : appels à l’API TMDB et transformation des données.
- **app/Console/Commands/**
  - `FetchDisneyMoviesCommand` : commande `movies:fetch-disney` pour importer/mettre à jour les films.
- **routes/**
  - `api.php` : routes API consommées par le front (auth + films).

---

## 🔌 Endpoints principaux

### Auth (Sanctum)

- `POST /api/login`  
  Body : `{ email, password }`  
  Réponse : `{ token, token_type: 'Bearer', user: { id, name, email } }`

- `POST /api/register`  
  Body : `{ name, email, password }`  
  Réponse identique à `login`.

- `POST /api/logout` *(auth: sanctum)*  
  Révoque le token courant.

- `GET /api/user` *(auth: sanctum)*  
  Retourne l’utilisateur courant.

### Movies

- `GET /api/movies`  
  Liste paginée de films (via `MovieResource::collection`), avec meta Laravel :
  ```json
  {
    "data": [ { ... } ],
    "links": { ... },
    "meta": {
      "current_page": 1,
      "last_page": 5,
      "per_page": 15,
      "total": 75,
      ...
    }
  }
  ```

- `GET /api/movies/{id}`  
  Détail complet d’un film (description, moyenne des notes, commentaires, etc.) via `MovieDetailResource`.

- `POST /api/movies/{id}/rate` *(auth: sanctum)*  
  Body :
  ```json
  { "rating": 4, "comment": "Super film !" }
  ```  
  Réponse :
  ```json
  { "message": "Rating saved successfully.", "movie_id": 123 }
  ```

---

## 🎬 Import des films Disney (TMDB)

Pour importer les films Disney Animation depuis TMDB dans la table `movies` :

```bash
php artisan movies:fetch-disney --pages=10
```

- Utilise `TmdbService` pour appeler TMDB.
- Upsert dans `movies` sur la clé `tmdb_id`.

---

## 🔗 Intégration avec le front

- Le front (`movie-front`) consomme :
  - `GET /api/movies` + `GET /api/movies/{id}` pour la liste + détail.
  - `POST /api/movies/{id}/rate` pour la notation/commentaire (après login/register).
  - `POST /api/login`, `POST /api/register`, `POST /api/logout`, `GET /api/user` pour l’auth.
- Le token Sanctum est stocké côté front dans `localStorage` (`auth_token`) et envoyé via l’en-tête `Authorization: Bearer <token>`.
