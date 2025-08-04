import { useEffect, useState } from 'react';
import { fetchGenres, fetchRandomMovie } from './api/movies';
import type { Genre, Movie } from './types/movie';
import type { AppProps } from './types/appprops';
import { FeedbackMessage } from './components/FeedbackMessage';
import { SkeletonLoader } from './components/SkeletonLoader';


function App({}: AppProps) {

  const currentYear = new Date().getFullYear(); // Obtiene el año actual
  const [movie, setMovie] = useState<Movie | null>(null);
  const [firstSpin, setFirstSpin] = useState<boolean>(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [error, setError] = useState<Error | null>(null); 
  const [isStopping, setIsStopping] = useState(false);

  const [filters, setFilters] = useState<{
    genreId?: number;
    year?: string;
  }>({});
  const [genres, setGenres] = useState<Genre[]>([]);


  useEffect(() => {
    fetchGenres().then(setGenres);
  }, []);
  

  const RuletaButton = () => {
    const [spinState, setSpinState] = useState<"idle" | "spinning" | "stopping">("idle");
    
    try{    
      const handleSpin = async () => {
        const safeYear = filters.year && parseInt(filters.year) > currentYear 
          ? currentYear.toString() 
          : filters.year;

        // 1. Iniciar giro
        setSpinState("spinning");

        // 2. Esperar 1.5 segundos (animación mínima)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 3. Transición a frenado
        setSpinState("stopping");
          
        // 4. Cargar película (simulado)
        const movieData = await fetchRandomMovie(filters.genreId, safeYear);

        // 5. Validar
        if (!movieData) throw new Error("No hay resultados");

        // 6. Finalizar Spin
        setSpinState("idle");

        // 7. Mostrar información
        setMovie(movieData);
      };
    
      return (
        <button
          className={`ruleta-button ${spinState}`}
          onClick={handleSpin}
          disabled={spinState !== "idle"}
          onAnimationEnd={() => spinState === "stopping" && setSpinState("idle")}
        >
          {spinState === "idle" ? "Girar" : "Buscando..."}
        </button>
      );
    } catch (err) {
      // 6. Manejo de errores
      setSpinState("stopping");
      setSpinState("idle");

      setError(err instanceof Error ? err : new Error("Error desconocido"));
    }
  };

  return (
    <div className="app">
      {/* 1. Título y botón */}
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
              setError(new Error(`¡El año máximo es ${currentYear}!`));
              setFilters({ ...filters, year: currentYear.toString() });
            } else {
              setFilters({ ...filters, year: inputYear });
            }

            if (value === "" || (Number(value) >= 1900 && Number(value) <= new Date().getFullYear())) {
              setFilters({ ...filters, year: value });
            }
          }}
        />
      </div>

      <RuletaButton />

      {/* 2. Skeleton Loader (mientras carga) */}
      {isSpinning && <SkeletonLoader />}

      {/* 3. Resultado de la película (cuando ya cargó) */}
      {!isSpinning && movie && (
          <div className={`movie-card ${movie ? "visible" : ""}`}>
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

        {/* 4. Mensaje si no hay resultados */}
        {!firstSpin && !isSpinning && !movie && (
          <FeedbackMessage type={error ? "error" : "empty"} />
        )}

    </div>
  );
}

export default App;