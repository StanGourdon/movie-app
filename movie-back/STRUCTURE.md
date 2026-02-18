# Arborescence backend – `movie-back` (Laravel 12 + Sanctum)

Backend API Laravel pour l’application front `movie-front` (films Disney, notes/commentaires, auth Sanctum).

---

## Arborescence principale

```
movie-back/
├── app/
│   ├── Console/
│   │   └── Commands/
│   │       └── FetchDisneyMoviesCommand.php   # Commande artisan pour importer les films depuis TMDB
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Controller.php                 # Contrôleur de base (Laravel)
│   │   │   └── Api/
│   │   │       ├── AuthController.php         # Auth API : login, register, logout
│   │   │       └── MovieController.php        # API films : liste, détail, notation/commentaire
│   │   ├── Requests/
│   │   │   └── Api/
│   │   │       └── RateMovieRequest.php       # Validation pour POST /movies/{id}/rate
│   │   └── Resources/
│   │       └── Api/
│   │           ├── MovieResource.php          # Ressource pour la liste paginée des films
│   │           ├── MovieDetailResource.php    # Ressource détail film (description, notes, commentaires)
│   │           ├── CommentResource.php        # Ressource pour les commentaires
│   │           └── StarResource.php           # Ressource pour les notes (étoiles)
│   ├── Models/
│   │   ├── User.php                           # Utilisateur (Sanctum tokens, relations)
│   │   ├── Movie.php                          # Film (tmdb_id, title, description, release_date, img_url, relations)
│   │   ├── Comment.php                        # Commentaire sur un film
│   │   ├── Like.php                           # Like sur un commentaire ou un film (selon implémentation)
│   │   └── Star.php                           # Note (rating 1-5) d'un utilisateur sur un film
│   ├── Providers/
│   │   └── AppServiceProvider.php             # Configuration application (boot, bindings éventuels)
│   └── Services/
│       └── TmdbService.php                    # Service pour appeler l’API TMDB (fetch / transformer films)
│
├── config/
│   ├── app.php, auth.php, cache.php, database.php, queue.php, session.php, ...  # Configs Laravel standard
│   ├── sanctum.php                            # Config Sanctum (middlewares, domaines, expiration)
│   ├── cors.php                               # CORS pour autoriser le front movie-front
│   └── services.php                           # Config des services externes (TMDB : base_url, bearer_token, etc.)
│
├── database/
│   ├── factories/
│   │   └── UserFactory.php                    # Factory utilisateur pour les tests / seeders
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 2026_02_14_132742_create_movies_table.php
│   │   ├── 2026_02_14_132757_create_comments_table.php
│   │   ├── 2026_02_14_132757_create_likes_table.php
│   │   ├── 2026_02_14_132800_create_stars_table.php
│   │   ├── 2026_02_15_133430_create_personal_access_tokens_table.php
│   │   └── ... (cache, jobs, etc.)           # Migrations Laravel standard
│   └── seeders/
│       └── DatabaseSeeder.php                 # Point d’entrée pour les seeders
│
├── routes/
│   ├── api.php                                # Routes API : auth + films (utilisées par le front)
│   ├── web.php                                # Routes web (facultatives pour ce projet API)
│   └── console.php                            # Enregistrement des commandes artisan
│
└── STRUCTURE.md                               # Ce fichier
```

---

## Détail des principales briques

### 1. API d’authentification (Sanctum)

- **Contrôleur** : `app/Http/Controllers/Api/AuthController.php`
  - `login(Request $request)`  
    - `POST /api/login`  
    - Valide `email`, `password`, tente `Auth::attempt`  
    - Retourne :  
      ```json
      {
        "token": "xxx",
        "token_type": "Bearer",
        "user": { "id": 1, "name": "...", "email": "..." }
      }
      ```
  - `register(Request $request)`  
    - `POST /api/register`  
    - Valide `name`, `email` (unique), `password` (min:8)  
    - Crée l’utilisateur, génère un token Sanctum, retourne le même format que login.
  - `logout(Request $request)`  
    - `POST /api/logout` (protégé par `auth:sanctum`)  
    - Révoque le token courant.

- **Routes** : `routes/api.php`
  - `POST /api/login` → `AuthController@login`
  - `POST /api/register` → `AuthController@register`
  - `POST /api/logout` → `AuthController@logout` (middleware `auth:sanctum`)
  - `GET /api/user` → utilisateur courant, middleware `auth:sanctum`

### 2. API films

- **Contrôleur** : `app/Http/Controllers/Api/MovieController.php`
  - `index(Request $request)`  
    - `GET /api/movies`  
    - Liste paginée des films, ordonnée par `release_date desc`, avec `withAvg('stars', 'rating')`  
    - Retourne un `MovieResource::collection($movies)` (forme paginée Laravel : `data`, `links`, `meta`).
  - `show(Movie $movie)`  
    - `GET /api/movies/{id}`  
    - Charge `comments.user`, `stars.user`, `loadAvg('stars', 'rating')`  
    - Retourne `MovieDetailResource` (film complet).
  - `rate(RateMovieRequest $request, Movie $movie)`  
    - `POST /api/movies/{id}/rate` (middleware `auth:sanctum`)  
    - Met à jour / crée une entrée `Star` (rating 1–5) pour l’utilisateur courant  
    - Met à jour / crée un `Comment` si `comment` fourni  
    - Réponse :  
      ```json
      { "message": "Rating saved successfully.", "movie_id": 123 }
      ```

- **Requests** : `app/Http/Requests/Api/RateMovieRequest.php`  
  - Valide le body `{ rating: number, comment?: string }`.

- **Resources** :  
  - `MovieResource` : vue liste (id, title, release_date, poster_url, average_rating)  
  - `MovieDetailResource` : vue détail (description, ratings_count, comments[], ratings[])  
  - `CommentResource` / `StarResource` : format comment / rating pour l’API.

- **Modèles** :  
  - `Movie` : relations `comments`, `likes`, `stars` ; champs `tmdb_id`, `title`, `description`, `release_date`, `img_url`.  
  - `Comment`, `Like`, `Star` : entités associées au film et à l’utilisateur.  
  - `User` : `HasApiTokens` (Sanctum), relations vers `comments`, `likes`, `stars`.

### 3. Intégration TMDB

- **Service** : `app/Services/TmdbService.php`
  - `fetchDisneyAnimationMovies(int $page)` : appelle TMDB `discover/movie` avec filtres (Disney Animation, genre Animation).
  - `fetchAllDisneyAnimationMovies(int $maxPages)` : boucle paginée avec rate limiting (usleep), renvoie un tableau de films TMDB.
  - `transformMovieForUpsert(array $tmdbMovie)` : transforme un film TMDB en tableau pour `movies` (`tmdb_id`, `title`, `description`, `release_date`, `img_url`).

- **Commande artisan** : `app/Console/Commands/FetchDisneyMoviesCommand.php`
  - Signature : `movies:fetch-disney {--pages=10}`  
  - Utilise `TmdbService` pour récupérer puis `Movie::updateOrCreate` pour insérer / mettre à jour les films.

### 4. Base de données

- **Migrations clés** :
  - `create_users_table` : utilisateurs (auth).  
  - `create_movies_table` : films importés de TMDB (tmdb_id unique, title, description, release_date, img_url).  
  - `create_comments_table`, `create_likes_table`, `create_stars_table` : commentaires, likes, notes.  
  - `create_personal_access_tokens_table` : tokens Sanctum.

---

## Rôle global

- **Auth (Sanctum)** : authentification token, utilisée par le front pour accéder aux endpoints protégés (notation/commentaire, `/api/user`, logout).
- **Movies API** : fournit les données au front (liste paginée, détail, notes/commentaires, endpoint de notation).
- **TMDB Service + Commande** : pipeline d’import des films Disney depuis TMDB vers la base locale.
- **Config** : `cors`, `sanctum`, `services.tmdb` assurent la communication sécurisée entre le front `movie-front` et l’API, ainsi que les appels externes à TMDB.\n*** End Patch"}]}/>
