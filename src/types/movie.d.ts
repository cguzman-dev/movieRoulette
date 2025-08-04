// src/types/movie.d.ts
export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date?: string;
    vote_average?: number;
    genre_ids?: number[];
    videoKey?: string; // ID del video en YouTube
}

export interface Genre {
    id: number;
    name: string;
}