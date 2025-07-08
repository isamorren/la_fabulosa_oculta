'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, Calendar, Globe, Star, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface MovieFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function MovieFilters({ onFiltersChange }: MovieFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    genre: '',
    year: '',
    country: '',
    rating: '',
    duration: '',
  })

  const genres: FilterOption[] = [
    { value: '28', label: 'Acción', count: 145 },
    { value: '12', label: 'Aventura', count: 89 },
    { value: '16', label: 'Animación', count: 67 },
    { value: '35', label: 'Comedia', count: 234 },
    { value: '80', label: 'Crimen', count: 123 },
    { value: '18', label: 'Drama', count: 456 },
    { value: '14', label: 'Fantasía', count: 78 },
    { value: '27', label: 'Terror', count: 91 },
  ]

  const years = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2010s', label: '2010-2019' },
    { value: '2000s', label: '2000-2009' },
    { value: '90s', label: '1990-1999' },
  ]

  const handleFilterChange = (category: string, value: string) => {
    const newFilters = { ...activeFilters, [category]: value }
    setActiveFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const clearFilters = () => {
    setActiveFilters({
      genre: '',
      year: '',
      country: '',
      rating: '',
      duration: '',
    })
    onFiltersChange({})
  }

  const activeFilterCount = Object.values(activeFilters).filter(Boolean).length

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-full border px-4 py-2 transition-all',
          isOpen
            ? 'border-white bg-white text-black'
            : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Filter className="h-4 w-4" />
        <span>Filtros</span>
        {activeFilterCount > 0 && (
          <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
            {activeFilterCount}
          </span>
        )}
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60"
            />

            {/* Filter Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-black/95 backdrop-blur-xl"
            >
              <div className="p-6">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Filtros</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-2 transition-colors hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Filter Sections */}
                <div className="space-y-8">
                  {/* Genre Filter */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <Filter className="h-5 w-5" />
                      Género
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {genres.map((genre) => (
                        <motion.button
                          key={genre.value}
                          onClick={() => handleFilterChange('genre', genre.value)}
                          className={cn(
                            'rounded-lg border px-4 py-2 text-sm transition-all',
                            activeFilters.genre === genre.value
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : 'border-white/20 hover:bg-white/10'
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{genre.label}</span>
                          {genre.count && (
                            <span className="ml-1 text-xs opacity-60">({genre.count})</span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Year Filter */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <Calendar className="h-5 w-5" />
                      Año
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {years.map((year) => (
                        <motion.button
                          key={year.value}
                          onClick={() => handleFilterChange('year', year.value)}
                          className={cn(
                            'rounded-lg border px-4 py-2 text-sm transition-all',
                            activeFilters.year === year.value
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : 'border-white/20 hover:bg-white/10'
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {year.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <Star className="h-5 w-5" />
                      Calificación
                    </h3>
                    <div className="space-y-2">
                      {[9, 8, 7, 6].map((rating) => (
                        <motion.button
                          key={rating}
                          onClick={() => handleFilterChange('rating', rating.toString())}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all',
                            activeFilters.rating === rating.toString()
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : 'border-white/20 hover:bg-white/10'
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span>{rating}+ puntos</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 rounded-lg border border-white/20 px-4 py-3 transition-colors hover:bg-white/10"
                  >
                    Limpiar filtros
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 rounded-lg bg-blue-500 px-4 py-3 text-white transition-colors hover:bg-blue-600"
                  >
                    Aplicar filtros
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
