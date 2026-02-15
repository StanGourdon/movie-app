<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    private const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
    private const DEFAULT_POSTER_SIZE = 'w500';
    private const SIZE_POSTER = [
        'miniature' => 'w92',
        'small' => 'w185',
        'medium' => 'w342',
        'large' => 'w500',
        'extra_large' => 'w780',
        'original' => 'original',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'tmdb_id',
        'title',
        'description',
        'release_date',
        'img_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'release_date' => 'date',
        ];
    }

    /**
     * Get the comments for the movie.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get the likes for the movie.
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    /**
     * Get the star ratings for the movie.
     */
    public function stars()
    {
        return $this->hasMany(Star::class);
    }


    public function getPosterUrlAttribute(): ?string
    {
        return $this->buildPosterUrl();
    }

    private function buildPosterUrl(string $size = self::DEFAULT_POSTER_SIZE): ?string
    {
        return $this->poster_path
            ? self::IMAGE_BASE_URL . $size . $this->poster_path
            : null;
    }
}
