<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
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
            'release_date' => $this->release_date?->format('Y-m-d'),
            'poster_url' => $this->img_url,
            'average_rating' => round((float) ($this->stars_avg_rating ?? 0), 1),
            'likes_count' => (int) ($this->likes_count ?? 0),
            'is_liked' => (bool) ($this->is_liked ?? false),
        ];
    }
}
