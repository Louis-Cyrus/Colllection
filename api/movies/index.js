import axios from 'axios';

const MOVIES_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_MOVIES_API_KEY;

export const fetchMovieCredits = async (movieId) => {
  try {
      const response = await axios.get(`${MOVIES_BASE_URL}/movie/${movieId}/credits`, {
          params: {
              api_key: API_KEY,
              language: 'fr-FR',
          }
      });
      return response.data;
  } catch (error) {
      throw error;
  }
}

export const searchMoviesWithCredits = async (query, page = 1) => {
  try {
      const response = await axios.get(`${MOVIES_BASE_URL}/search/movie`, {
          params: {
              api_key: API_KEY,
              query: query,
              language: 'fr-FR',
              page: page,
          }
      });

      const movies = response.data.results;
      const totalPages = response.data.total_pages; // Extract total pages from response

      // Fetch les crédits pour chaque film
      const creditsPromises = movies.map(movie => fetchMovieCredits(movie.id));
      const creditsResponses = await Promise.all(creditsPromises);
      
      // Assignez les crédits à chaque film
      movies.forEach((movie, index) => {
          movie.credits = creditsResponses[index];
      });

      return { movies, totalPages }; // Return movies and total pages

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

  export const fetchMovieById = async (id) => {
    try {
      const response = await axios.get(`${MOVIES_BASE_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
          language: 'fr-FR',
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };