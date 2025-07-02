import { tmdbClient } from './client'
import type { TMDBMovie, TMDBMovieDetails, TMDBResponse, TMDBGenre } from './types'

export const tmdbApi = {
  // Películas populares
  async getPopularMovies(page = 1) {
    const { data } = await tmdbClient.get<TMDBResponse<TMDBMovie>>('/movie/popular', {
      params: { page },
    })
    return data
  },

  // Películas en cartelera
  async getNowPlayingMovies(page = 1) {
    const { data } = await tmdbClient.get<TMDBResponse<TMDBMovie>>('/movie/now_playing', {
      params: { page },
    })
    return data
  },

  // Películas mejor valoradas
  async getTopRatedMovies(page = 1) {
    const { data } = await tmdbClient.get<TMDBResponse<TMDBMovie>>('/movie/top_rated', {
      params: { page },
    })
    return data
  },

  // Próximas películas
  async getUpcomingMovies(page = 1) {
    const { data } = await tmdbClient.get<TMDBResponse<TMDBMovie>>('/movie/upcoming', {
      params: { page },
    })
    return data
  },

  // Detalles de película
  async getMovieDetails(movieId: number) {
    const { data } = await tmdbClient.get<TMDBMovieDetails>(`/movie/${movieId}`, {
      params: {
        append_to_response: 'videos,credits',
      },
    })
    return data
  },

  // Buscar películas
  async searchMovies(query: string, page = 1) {
    const { data } = await tmdbClient.get<TMDBResponse<TMDBMovie>>('/search/movie', {
      params: { query, page },
    })
    return data
  },

  // Géneros
  async getGenres() {
    const { data } = await tmdbClient.get<{ genres: TMDBGenre[] }>('/genre/movie/list')
    return data.genres
  },

  // Películas por género
  async getMoviesByGenre(genreId: number, page = 1) {
    const { data } = await tmdbClient.get<TMDBResponse<TMDBMovie>>('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      },
    })
    return data
  },

  // Películas similares
  async getSimilarMovies(movieId: number) {
    const { data } = await tmdbClient.get<TMDBResponse<TMDBMovie>>(`/movie/${movieId}/similar`)
    return data
  },

  // Recomendaciones
  async getRecommendations(movieId: number) {
    const { data } = await tmdbClient.get<TMDBResponse<TMDBMovie>>(
      `/movie/${movieId}/recommendations`
    )
    return data
  },
}
