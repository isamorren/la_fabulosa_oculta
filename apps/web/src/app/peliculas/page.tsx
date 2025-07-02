'use client'

import { useQuery } from '@tanstack/react-query'
import { tmdbApi } from '@/lib/tmdb/api'
import { FilmCardTMDB } from '@/components/tmdb/film-card-tmdb'
import { PageHeader } from '@/components/page-header'
import { FilmGrid } from '@/components/film-grid'
import { Skeleton } from '@ui/components/skeleton'

export default function PeliculasPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => tmdbApi.getPopularMovies(),
  })

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Películas"
        description="Análisis profundos y reseñas de las mejores películas del cine contemporáneo y clásico"
      />

      <section className="container mx-auto px-6 py-12">
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
