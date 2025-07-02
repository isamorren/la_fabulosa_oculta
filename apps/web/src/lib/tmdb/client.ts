import axios from 'axios'

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'

if (!TMDB_API_KEY) {
  console.warn(
    'TMDB API key not found. Please add NEXT_PUBLIC_TMDB_API_KEY to your .env.local file'
  )
}

export const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'es-ES',
  },
})

export const imageConfig = {
  base_url: TMDB_IMAGE_BASE_URL,
  poster_sizes: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop_sizes: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
}

export function getPosterUrl(
  path: string | null,
  size: keyof typeof imageConfig.poster_sizes = 'large'
) {
  if (!path) return '/placeholder-poster.jpg'
  return `${imageConfig.base_url}/${imageConfig.poster_sizes[size]}${path}`
}

export function getBackdropUrl(
  path: string | null,
  size: keyof typeof imageConfig.backdrop_sizes = 'large'
) {
  if (!path) return '/placeholder-backdrop.jpg'
  return `${imageConfig.base_url}/${imageConfig.backdrop_sizes[size]}${path}`
}
