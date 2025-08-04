import axios from 'axios';

import type { Movie, Genre } from '../types/movie';

const API_KEY = '5667a1f398e86d554cc435eb50e989b1';
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await axios.get(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es`
  );
  return response.data.genres;
};

export const fetchRandomMovie = async (genreId?: number, year?: string): Promise<Movie | null> => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es${
      genreId ? `&with_genres=${genreId}` : ''
    }${year ? `&primary_release_year=${year}` : ''}`
  );

  const movies = response.data.results;
  const movie = movies[Math.floor(Math.random() * movies.length)]


  return movie;
};

export const fetchMovieTrailer = async (movieId: number): Promise<string | null> => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=es`
  );
  const trailer = response.data.results.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube"
  );
  return trailer?.key || null;
};