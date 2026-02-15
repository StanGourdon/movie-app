<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'release_date' => $this->release_date?->format('Y-m-d'),
            'poster_url' => $this->img_url,
            'average_rating' => round((float) $this->average_rating, 1),
            'ratings_count' => $this->when(
                $this->relationLoaded('stars'),
                fn () => $this->stars->count()
            ),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'ratings' => StarResource::collection($this->whenLoaded('stars')),
        ];
    }
}
