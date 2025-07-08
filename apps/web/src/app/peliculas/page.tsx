'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { tmdbApi } from '@/lib/tmdb/api'
import { FilmCardTMDB } from '@/components/tmdb/film-card-tmdb'
import { PageHeader } from '@/components/page-header'
import { FilmGrid } from '@/components/film-grid'
import { MovieFilters } from '@/components/filters/movie-filters'
import { Skeleton } from '@ui/components/skeleton'

export default function PeliculasPage() {
  const [filters, setFilters] = useState({})

  const { data, isLoading } = useQuery({
    queryKey: ['movies', 'popular', filters],
    queryFn: () => tmdbApi.getPopularMovies(),
  })

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Películas"
        description="Análisis profundos y reseñas de las mejores películas del cine contemporáneo y clásico"
      />

      <section className="container mx-auto px-6 py-12">
        {/* Filters Bar */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {data?.total_results
              ? `${data.total_results.toLocaleString()} películas`
              : 'Cargando...'}
          </h2>
          <MovieFilters onFiltersChange={setFilters} />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[2/3] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <FilmGrid>
            {data?.results.map((movie, index) => (
              <FilmCardTMDB key={movie.id} movie={movie} index={index} />
            ))}
          </FilmGrid>
        )}
      </section>
    </div>
  )
}
