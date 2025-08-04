import { useFavorites } from "../hooks/useFavorites";

export const Favorites = () => {
    const { favorites } = useFavorites();
    
    return (
      <div>
        <h2>Tus favoritos</h2>
        {favorites.map(movie => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    );
  };