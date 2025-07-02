'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { tmdbApi } from '@/lib/tmdb/api'
import { FilmCardTMDB } from '@/components/tmdb/film-card-tmdb'
import { FeaturedSlider } from '@/components/home/featured-slider'
import { MovieQuotes } from '@/components/home/movie-quotes'
import { motion } from 'framer-motion'
import { TMDBMovie } from '@/lib/tmdb/types'

const ThreeHeroEnhanced = dynamic(
  () =>
    import('@/components/three-hero-enhanced').then((mod) => ({ default: mod.ThreeHeroEnhanced })),
  {
    ssr: false,
    loading: () => null,
  }
)

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [hoveredMovie, setHoveredMovie] = useState<TMDBMovie | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: nowPlayingMovies } = useQuery({
    queryKey: ['movies', 'nowPlaying', 'home'],
    queryFn: () => tmdbApi.getNowPlayingMovies(),
  })

  const { data: popularMovies } = useQuery({
    queryKey: ['movies', 'popular', 'home'],
    queryFn: () => tmdbApi.getPopularMovies(),
  })

  const { data: topRatedMovies } = useQuery({
    queryKey: ['movies', 'topRated', 'home'],
    queryFn: () => tmdbApi.getTopRatedMovies(),
  })

  const featuredMovies = nowPlayingMovies?.results.slice(0, 5) || []

  return (
    <>
      {/* Hero Section con Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Three.js Background Enhanced */}
        {mounted && popularMovies && (
          <Suspense fallback={null}>
            <ThreeHeroEnhanced movies={popularMovies.results} hoveredMovie={hoveredMovie} />
          </Suspense>
        )}

        {/* Featured Movies Slider */}
        {featuredMovies.length > 0 && (
          <div className="relative z-10">
            <FeaturedSlider movies={featuredMovies} onMovieHover={setHoveredMovie} />
          </div>
        )}

        {/* Movie Quotes */}
        <MovieQuotes />
      </section>

      {/* Películas Populares - Minimalista */}
      <main className="relative z-10">
        {popularMovies && popularMovies.results.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-light text-gray-400">Populares ahora</h2>
              </motion.div>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {popularMovies.results.slice(0, 10).map((movie, index) => (
                  <FilmCardTMDB key={movie.id} movie={movie} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        {topRatedMovies && topRatedMovies.results.length > 0 && (
          <section className="bg-black/20 py-20">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-light text-gray-400">Mejor valoradas</h2>
              </motion.div>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {topRatedMovies.results.slice(0, 5).map((movie, index) => (
                  <FilmCardTMDB key={movie.id} movie={movie} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
