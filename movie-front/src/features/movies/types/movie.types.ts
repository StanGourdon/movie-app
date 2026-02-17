export interface Movie {
  id: number;
  title: string;
  release_date: string | null;
  poster_url: string | null;
  average_rating: number;
}

export interface MovieDetail extends Movie {
  description: string | null;
  ratings_count: number;
  comments: Comment[];
  ratings: Star[];
}

export interface Comment {
  id: number;
  user_name: string;
  content: string;
  created_at: string;
}

export interface Star {
  id: number;
  rating: number;
  user_name: string;
  created_at: string;
}

/** Réponse paginée renvoyée par l'API Laravel (data + meta). */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export interface RateMovieRequest {
  rating: number; // 1-5
  comment?: string;
}

