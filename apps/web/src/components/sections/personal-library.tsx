'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bookmark, Heart, Eye, Clock, Filter, Grid, List, Search, Plus, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SavedMovie {
  id: number
  title: string
  poster: string
  year: number
  rating: number
  savedDate: Date
  status: 'watched' | 'watchlist' | 'favorite'
  personalRating?: number
  notes?: string
}

// Mock data - en producción vendría de la base de datos
const mockSavedMovies: SavedMovie[] = [
  {
    id: 1,
    title: 'Oppenheimer',
    poster: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    year: 2023,
    rating: 8.1,
    savedDate: new Date('2024-01-15'),
    status: 'watched',
    personalRating: 9,
    notes: 'Una obra maestra sobre la responsabilidad moral de la ciencia',
  },
  {
    id: 2,
    title: 'The Zone of Interest',
    poster: '/h3wAReIpUS67F0i2YzLPbiCSsEv.jpg',
    year: 2023,
    rating: 7.8,
    savedDate: new Date('2024-01-10'),
    status: 'watched',
    personalRating: 8.5,
  },
  {
    id: 3,
    title: 'Killers of the Flower Moon',
    poster: '/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg',
    year: 2023,
    rating: 7.6,
    savedDate: new Date('2024-01-08'),
    status: 'watchlist',
  },
  {
    id: 4,
    title: 'Past Lives',
    poster: '/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
    year: 2023,
    rating: 8.0,
    savedDate: new Date('2024-01-05'),
    status: 'favorite',
    personalRating: 10,
    notes: 'La película más emotiva del año',
  },
]

const statusConfig = {
  watched: { label: 'Vistas', icon: Eye, color: 'text-green-500' },
  watchlist: { label: 'Por ver', icon: Clock, color: 'text-blue-500' },
  favorite: { label: 'Favoritas', icon: Heart, color: 'text-red-500' },
}

export function PersonalLibrary() {
  const [movies, setMovies] = useState(mockSavedMovies)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<'all' | 'watched' | 'watchlist' | 'favorite'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMovie, setSelectedMovie] = useState<SavedMovie | null>(null)

  const filteredMovies = movies.filter((movie) => {
    const matchesFilter = filter === 'all' || movie.status === filter
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: movies.length,
    watched: movies.filter((m) => m.status === 'watched').length,
    watchlist: movies.filter((m) => m.status === 'watchlist').length,
    favorites: movies.filter((m) => m.status === 'favorite').length,
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Mi Filmoteca Personal</h1>
          <p className="text-xl text-gray-400">
            Tu colección privada de películas y recuerdos cinematográficos
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <Bookmark className="mb-2 h-8 w-8 text-gray-400" />
            <p className="text-3xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-400">Total guardadas</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <Eye className="mb-2 h-8 w-8 text-green-500" />
            <p className="text-3xl font-bold">{stats.watched}</p>
            <p className="text-sm text-gray-400">Películas vistas</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <Clock className="mb-2 h-8 w-8 text-blue-500" />
            <p className="text-3xl font-bold">{stats.watchlist}</p>
            <p className="text-sm text-gray-400">Por ver</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <Heart className="mb-2 h-8 w-8 text-red-500" />
            <p className="text-3xl font-bold">{stats.favorites}</p>
            <p className="text-sm text-gray-400">Favoritas</p>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-col gap-4 md:flex-row"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en tu colección..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-12 pr-4 backdrop-blur-sm focus:border-white/20 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {(['all', 'watched', 'watchlist', 'favorite'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                  filter === filterType ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'
                )}
              >
                {filterType === 'all' ? 'Todas' : statusConfig[filterType]?.label || filterType}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setView('grid')}
              className={cn(
                'rounded-lg p-2 transition-all',
                view === 'grid' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'
              )}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'rounded-lg p-2 transition-all',
                view === 'list' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'
              )}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Movies Grid/List */}
        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {filteredMovies.map((movie, index) => {
                const StatusIcon = statusConfig[movie.status].icon
                const statusColor = statusConfig[movie.status].color

                return (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <div className="relative mb-3 aspect-[2/3] overflow-hidden rounded-lg">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="absolute bottom-4 left-4 right-4">
                          <StatusIcon className={cn('mb-2 h-6 w-6', statusColor)} />
                          {movie.personalRating && (
                            <p className="text-sm">Mi rating: {movie.personalRating}/10</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <h3 className="line-clamp-1 font-semibold">{movie.title}</h3>
                    <p className="text-sm text-gray-400">{movie.year}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredMovies.map((movie, index) => {
                const StatusIcon = statusConfig[movie.status].icon
                const statusColor = statusConfig[movie.status].color

                return (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex cursor-pointer gap-4 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10"
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <div className="relative aspect-[2/3] w-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{movie.title}</h3>
                          <p className="text-gray-400">{movie.year}</p>
                        </div>
                        <StatusIcon className={cn('h-5 w-5', statusColor)} />
                      </div>
                      {movie.notes && (
                        <p className="line-clamp-2 text-sm text-gray-400">{movie.notes}</p>
                      )}
                      <div className="mt-2 flex items-center gap-4 text-sm">
                        <span className="text-gray-400">
                          Guardada el {movie.savedDate.toLocaleDateString('es-ES')}
                        </span>
                        {movie.personalRating && (
                          <span className="text-yellow-500">★ {movie.personalRating}/10</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredMovies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <Filter className="mx-auto mb-4 h-16 w-16 text-gray-600" />
            <p className="text-xl text-gray-400">No se encontraron películas</p>
            <p className="mt-2 text-gray-500">
              Intenta ajustar tus filtros o buscar algo diferente
            </p>
          </motion.div>
        )}
      </div>

      {/* Movie Detail Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
            onClick={() => setSelectedMovie(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-gray-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid gap-6 p-6 md:grid-cols-3">
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster}`}
                      alt={selectedMovie.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-4 md:col-span-2">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold">{selectedMovie.title}</h2>
                      <p className="text-gray-400">{selectedMovie.year}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {React.createElement(statusConfig[selectedMovie.status].icon, {
                          className: cn('h-5 w-5', statusConfig[selectedMovie.status].color),
                        })}
                        <span>{statusConfig[selectedMovie.status].label}</span>
                      </div>
                      {selectedMovie.personalRating && (
                        <div className="text-yellow-500">★ {selectedMovie.personalRating}/10</div>
                      )}
                    </div>

                    {selectedMovie.notes && (
                      <div>
                        <h3 className="mb-2 font-semibold">Mis notas</h3>
                        <p className="text-gray-300">{selectedMovie.notes}</p>
                      </div>
                    )}

                    <div className="space-y-2 pt-4">
                      <Link
                        href={`/pelicula/${selectedMovie.id}`}
                        className="block w-full rounded-lg bg-white py-3 text-center font-medium text-black transition-colors hover:bg-gray-200"
                      >
                        Ver película completa
                      </Link>
                      <button className="w-full rounded-lg bg-red-500/20 py-3 font-medium text-red-500 transition-colors hover:bg-red-500/30">
                        Eliminar de mi colección
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
