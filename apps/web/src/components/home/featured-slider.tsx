'use client'

import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, PlayCircle } from 'lucide-react'
import { TMDBMovie } from '@/lib/tmdb/types'
import { getBackdropUrl } from '@/lib/tmdb/client'

interface FeaturedSliderProps {
  movies: TMDBMovie[]
  onMovieHover?: (movie: TMDBMovie | null) => void
}

export function FeaturedSlider({ movies, onMovieHover }: FeaturedSliderProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }

  return (
    <div className="relative">
      {/* Slider Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="relative min-w-0 flex-[0_0_100%]"
              onMouseEnter={() => onMovieHover?.(movie)}
              onMouseLeave={() => onMovieHover?.(null)}
            >
              <Link href={`/pelicula/${movie.id}`}>
                <div className="group relative h-[50vh] cursor-pointer overflow-hidden md:h-[60vh] lg:h-[70vh]">
                  {/* Background Image */}
                  <Image
                    src={getBackdropUrl(movie.backdrop_path)}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />

                  {/* Gradient Overlays */}
                  <div className="from-background via-background/60 absolute inset-0 bg-gradient-to-t to-transparent" />
                  <div className="from-background/80 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 max-w-2xl p-8 md:p-12 lg:p-16">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Movie Title */}
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                          {movie.title}
                        </h2>

                        {/* Movie Info */}
                        <div className="mb-4 flex items-center gap-4 text-sm md:text-base">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span>{movie.vote_average.toFixed(1)}</span>
                          </div>
                          <span>•</span>
                          <span>{new Date(movie.release_date).getFullYear()}</span>
                        </div>

                        {/* Overview */}
                        <p className="mb-6 line-clamp-3 text-sm text-gray-300 md:text-base">
                          {movie.overview}
                        </p>

                        {/* CTA Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                          <PlayCircle className="h-5 w-5" />
                          <span>Ver reseña</span>
                        </motion.button>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-4 flex gap-2 md:right-8 lg:right-16">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-300 ${
              index === selectedIndex ? 'h-2 w-8 bg-white' : 'h-2 w-2 bg-white/40 hover:bg-white/60'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
