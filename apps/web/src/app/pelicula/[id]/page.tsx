'use client'

import { use } from 'react'
import { useQuery } from '@tanstack/react-query'
import { tmdbApi } from '@/lib/tmdb/api'
import { getBackdropUrl, getPosterUrl } from '@/lib/tmdb/client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Calendar, Clock, PlayCircle } from 'lucide-react'
import { Skeleton } from '@ui/components/skeleton'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function PeliculaPage({ params }: PageProps) {
  const { id } = use(params)

  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => tmdbApi.getMovieDetails(Number(id)),
  })

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="h-[60vh] w-full" />
        <div className="container mx-auto space-y-4 px-6 py-8">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    )
  }

  if (!movie) return null

  const releaseYear = new Date(movie.release_date).getFullYear()
  const director = movie.credits?.crew.find((person) => person.job === 'Director')
  const trailer = movie.videos?.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  )

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden md:h-[70vh]">
        <Image
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="from-background via-background/60 absolute inset-0 bg-gradient-to-t to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-4xl font-bold md:text-6xl"
            >
              {movie.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-4 text-sm md:text-base"
            >
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-muted-foreground">({movie.vote_count} votos)</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{releaseYear}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{movie.runtime} min</span>
              </div>

              {director && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Dirigida por</span>
                  <span className="font-semibold">{director.name}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Tagline */}
            {movie.tagline && (
              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground border-primary border-l-4 pl-6 text-xl font-light italic md:text-2xl"
              >
                "{movie.tagline}"
              </motion.blockquote>
            )}

            {/* Synopsis */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Sinopsis</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{movie.overview}</p>
            </div>

            {/* Trailer */}
            {trailer && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Tráiler</h2>
                <div className="bg-muted relative aspect-video overflow-hidden rounded-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    className="absolute inset-0 h-full w-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Cast */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Reparto Principal</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {movie.credits.cast.slice(0, 6).map((actor) => (
                    <div key={actor.id} className="flex items-center gap-3">
                      <div className="bg-muted h-12 w-12 overflow-hidden rounded-full">
                        {actor.profile_path && (
                          <Image
                            src={getPosterUrl(actor.profile_path, 'small')}
                            alt={actor.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{actor.name}</p>
                        <p className="text-muted-foreground text-xs">{actor.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Poster */}
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
              <Image
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <h3 className="text-muted-foreground text-sm font-semibold">Géneros</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              {movie.production_companies.length > 0 && (
                <div>
                  <h3 className="text-muted-foreground text-sm font-semibold">Producción</h3>
                  <p className="mt-1">{movie.production_companies[0].name}</p>
                </div>
              )}

              {movie.budget > 0 && (
                <div>
                  <h3 className="text-muted-foreground text-sm font-semibold">Presupuesto</h3>
                  <p className="mt-1">${movie.budget.toLocaleString()}</p>
                </div>
              )}

              {movie.revenue > 0 && (
                <div>
                  <h3 className="text-muted-foreground text-sm font-semibold">Recaudación</h3>
                  <p className="mt-1">${movie.revenue.toLocaleString()}</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
