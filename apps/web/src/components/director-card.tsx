'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Film, Star } from 'lucide-react'

interface DirectorCardProps {
  director: {
    name: string
    filmCount: number
    films: Array<{
      slug: string
      title: string
      rating?: number
    }>
  }
}

export function DirectorCard({ director }: DirectorCardProps) {
  const averageRating =
    director.films.reduce((acc, film) => acc + (film.rating || 0), 0) / director.films.length

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-card border-border group relative overflow-hidden rounded-lg border"
    >
      <div className="p-6">
        {/* Director Avatar Placeholder */}
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
          <span className="text-2xl font-bold text-white">
            {director.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </span>
        </div>

        {/* Director Info */}
        <h3 className="mb-2 text-center text-xl font-bold transition-colors group-hover:text-blue-400">
          {director.name}
        </h3>

        <div className="text-muted-foreground mb-4 flex items-center justify-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Film className="h-4 w-4" />
            {director.filmCount} {director.filmCount === 1 ? 'película' : 'películas'}
          </span>
          {averageRating > 0 && (
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              {averageRating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Recent Films */}
        <div className="space-y-2">
          <h4 className="text-muted-foreground text-sm font-medium">Películas reseñadas:</h4>
          <ul className="space-y-1">
            {director.films.slice(0, 3).map((film) => (
              <li key={film.slug}>
                <Link
                  href={`/posts/${film.slug}`}
                  className="text-muted-foreground text-sm transition-colors hover:text-white"
                >
                  {film.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.article>
  )
}
