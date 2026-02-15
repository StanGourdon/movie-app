<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\RateMovieRequest;
use App\Http\Resources\Api\MovieDetailResource;
use App\Http\Resources\Api\MovieResource;
use App\Models\Comment;
use App\Models\Movie;
use App\Models\Star;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    /**
     * Display a paginated listing of movies.
     * GET /api/movies
     */
    public function index(Request $request): JsonResponse
    {
        $movies = Movie::query()
            ->withAggregate('stars', 'avg(rating) as average_rating')
            ->orderBy('release_date', 'desc')
            ->paginate(15);

        return MovieResource::collection($movies)
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Display the specified movie with full details, comments and ratings.
     * GET /api/movies/{id}
     */
    public function show(Movie $movie): JsonResponse
    {
        $movie->load([
            'comments.user',
            'stars.user',
        ])->loadAggregate('stars', 'avg(rating) as average_rating');

        return (new MovieDetailResource($movie))
            ->response()
            ->setStatusCode(200);
    }

    /**
     * Rate a movie (and optionally add a comment).
     * POST /api/movies/{id}/rate
     */
    public function rate(RateMovieRequest $request, Movie $movie): JsonResponse
    {
        $user = $request->user();
        if (! $user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        Star::updateOrCreate(
            [
                'user_id' => $user->id,
                'movie_id' => $movie->id,
            ],
            ['rating' => $request->validated('rating')]
        );

        if ($request->filled('comment')) {
            Comment::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'movie_id' => $movie->id,
                ],
                ['content' => $request->validated('comment')]
            );
        }

        return response()->json([
            'message' => 'Rating saved successfully.',
            'movie_id' => $movie->id,
        ], 201);
    }
}
