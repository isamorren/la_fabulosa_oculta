'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@ui/components/card'
import { Star, Calendar } from 'lucide-react'
import { TMDBMovie } from '@/lib/tmdb/types'
import { getPosterUrl } from '@/lib/tmdb/client'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface FilmCardTMDBProps {
  movie: TMDBMovie
  index?: number
}

export function FilmCardTMDB({ movie, index = 0 }: FilmCardTMDBProps) {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/pelicula/${movie.id}`} className="block h-full">
        <Card className="group h-full cursor-pointer overflow-hidden">
          <div className="bg-muted relative aspect-[2/3] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Rating Badge */}
            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>

            {/* Movie Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="mb-1 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-blue-400">
                {movie.title}
              </h3>
              <div className="flex items-center gap-3 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {releaseYear}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
