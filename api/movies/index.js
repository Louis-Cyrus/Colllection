import axios from 'axios';

const MOVIES_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_MOVIES_API_KEY;

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${MOVIES_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'fr-FR'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchMovies = async (query) => {
    try {
      const response = await axios.get(`${MOVIES_BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
          language: 'fr-FR'
        }
      });
      return response.data.results;
    } catch (error) {
      throw error;
    }
  };


