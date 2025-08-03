import axios from 'axios';

import type { Movie } from '../types/movie';

const API_KEY = '5667a1f398e86d554cc435eb50e989b1';
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchRandomMovie = async (): Promise<Movie | null> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es`
    );
    const movies: Movie[] = response.data.results;
    return movies[Math.floor(Math.random() * movies.length)];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
};