<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TmdbService
{
    protected string $baseUrl;

    protected string $bearerToken;

    protected string $posterPath;

    protected string $posterSize;

    public function __construct()
    {
        $this->baseUrl = config('services.tmdb.base_url', 'https://api.themoviedb.org/3');
        $this->bearerToken = config('services.tmdb.bearer_token');
        $this->posterPath = config('services.tmdb.poster_path', 'https://image.tmdb.org/t/p/');
        $this->posterSize = config('services.tmdb.poster_size', 'w500');
    }

    /**
     * Fetch Disney animation movies from TMDB.
     * Uses Walt Disney Animation Studios (company ID 6125) and Animation genre (16).
     *
     * @return array<int, array{id: int, title: string, overview: string|null, release_date: string|null, poster_path: string|null}>
     */
    public function fetchDisneyAnimationMovies(int $page = 1): array
    {
        $http = Http::withToken($this->bearerToken);
        if (! config('services.tmdb.verify_ssl', true)) {
            $http = $http->withOptions(['verify' => false]);
        }
        $response = $http->get("{$this->baseUrl}/discover/movie", [
                'language' => 'fr-FR',
                'page' => $page,
                'with_companies' => 6125, // Walt Disney Animation Studios
                'with_genres' => 16,      // Animation
                'sort_by' => 'popularity.desc',
            ]);

        if (! $response->successful()) {
            Log::error('TMDB API error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            $response->throw();
        }

        $data = $response->json();
        return $data['results'] ?? [];
    }

    /**
     * Fetch all Disney animation movies across multiple pages.
     *
     * @param int $maxPages Maximum number of pages to fetch (TMDB returns 20 per page)
     * @return array<int, array{id: int, title: string, overview: string|null, release_date: string|null, poster_path: string|null}>
     */
    public function fetchAllDisneyAnimationMovies(int $maxPages = 10): array
    {
        $allMovies = [];
        $page = 1;

        do {
            $movies = $this->fetchDisneyAnimationMovies($page);
            $allMovies = array_merge($allMovies, $movies);

            if (empty($movies) || count($movies) < 20) {
                break;
            }

            $page++;

            if ($page > $maxPages) {
                break;
            }

            usleep(250000); // Rate limit: 250ms between requests
        } while (true);

        return $allMovies;
    }

    /**
     * Transform TMDB movie data to our movies table format.
     */
    public function transformMovieForUpsert(array $tmdbMovie): array
    {
        $posterPath = $tmdbMovie['poster_path'] ?? null;
        $imgUrl = $posterPath
            ? $this->posterPath.$this->posterSize.ltrim($posterPath, '/')
            : null;

        return [
            'tmdb_id' => $tmdbMovie['id'],
            'title' => $tmdbMovie['title'] ?? $tmdbMovie['original_title'] ?? 'Unknown',
            'description' => $tmdbMovie['overview'] ?? null,
            'release_date' => ! empty($tmdbMovie['release_date']) ? $tmdbMovie['release_date'] : null,
            'img_url' => $imgUrl,
        ];
    }
}
