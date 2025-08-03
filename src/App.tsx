import { useEffect, useState } from 'react';
import { fetchGenres, fetchRandomMovie } from './api/movies';
import type { Genre, Movie } from './types/movie';
import type { AppProps } from './types/appprops';


function App({}: AppProps) {

  const currentYear = new Date().getFullYear(); // Obtiene el año actual
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<{
    genreId?: number;
    year?: string;
  }>({});
  const [genres, setGenres] = useState<Genre[]>([]);
  const [yearError, setYearError] = useState('');
  const handleSpin = async () => {
    setIsLoading(true);
    setYearError('');
 
    const safeYear = filters.year && parseInt(filters.year) > currentYear 
    ? currentYear.toString() 
    : filters.year;
    const randomMovie = await fetchRandomMovie(filters.genreId, safeYear);
  
    setMovie(randomMovie);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);
  

  return (
    <div className="app">
      <h1>🎬 Movie Roulette</h1>
      <div className="filters">
        <select
          onChange={(e) => setFilters({ ...filters, genreId: Number(e.target.value) })}
        >
          <option value="">Todos los géneros</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Año (ej: 1999)"
          min="1900"
          max={currentYear}
          value={filters.year || ''}
          onChange={(e) => {
            let inputYear = e.target.value;
            const value = inputYear;
            
            if (inputYear && parseInt(inputYear) > currentYear) {
              setYearError(`¡El año máximo es ${currentYear}!`);
              setFilters({ ...filters, year: currentYear.toString() });
            } else {
              setYearError('');
              setFilters({ ...filters, year: inputYear });
            }

            if (value === "" || (Number(value) >= 1900 && Number(value) <= new Date().getFullYear())) {
              setFilters({ ...filters, year: value });
            }
          }}
        />
      </div>
      <button onClick={handleSpin} disabled={isLoading}>
        {isLoading ? 'Buscando...' : '¡Girar la ruleta!'}
      </button>

      <div className="error-messages">
        {yearError && <div className="error-bubble">{yearError}</div>}
      </div>

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