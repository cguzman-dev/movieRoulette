import { useState } from "react";
import type { Movie } from "../types/movie";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<Movie[]>(() => {
      const saved = localStorage.getItem('favoriteMovies');
      return saved ? JSON.parse(saved) : [];
    });
  
    const addFavorite = (movie: Movie) => {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem('favoriteMovies', JSON.stringify(updated));
    };
  
    const removeFavorite = (movieId: number) => {
        const updated = favorites.filter(movie => movie.id !== movieId);
        setFavorites(updated);
        localStorage.setItem('favoriteMovies', JSON.stringify(updated));
    };
    
    return { favorites, addFavorite, removeFavorite };
  };