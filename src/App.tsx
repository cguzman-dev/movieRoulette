import { useState } from 'react';
import { fetchRandomMovie } from './api/movies';
import type { Movie } from './types/movie';
import type { AppProps } from './types/appprops';


function App({}: AppProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSpin = async () => {
    setIsLoading(true);
    const randomMovie = await fetchRandomMovie();
    setMovie(randomMovie);
    setIsLoading(false);
  };

  return (
    <div className="app">
      <h1>🎬 Movie Roulette</h1>
      <button onClick={handleSpin} disabled={isLoading}>
        {isLoading ? 'Buscando...' : '¡Girar la ruleta!'}
      </button>

      {movie && (
        <div className="movie-card">
          <h2>{movie.title}</h2>
          <img 
            src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` 
              : 'https://via.placeholder.com/300x450?text=No+Poster'
            } 
            alt={movie.title} 
          />
          <p>{movie.overview || 'No hay descripción disponible.'}</p>
        </div>
      )}
    </div>
  );
}

export default App;