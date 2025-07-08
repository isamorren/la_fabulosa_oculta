'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Film,
  Star,
  Clock,
  MapPin,
  Bell,
  BellOff,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface MovieRelease {
  id: number
  title: string
  poster: string
  releaseDate: Date
  director: string
  genre: string[]
  synopsis: string
  anticipationLevel: 'high' | 'medium' | 'low'
  distributor: string
  runtime?: number
  isReminded: boolean
}

// Mock data - en producción vendría de la API
const upcomingReleases: MovieRelease[] = [
  {
    id: 1,
    title: 'Dune: Part Three',
    poster: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    releaseDate: new Date('2024-12-15'),
    director: 'Denis Villeneuve',
    genre: ['Ciencia Ficción', 'Aventura'],
    synopsis: 'La conclusión épica de la saga de Paul Atreides en Arrakis.',
    anticipationLevel: 'high',
    distributor: 'Warner Bros',
    runtime: 165,
    isReminded: true,
  },
  {
    id: 2,
    title: 'Oppenheimer 2',
    poster: '/h3wAReIpUS67F0i2YzLPbiCSsEv.jpg',
    releaseDate: new Date('2024-11-22'),
    director: 'Christopher Nolan',
    genre: ['Drama', 'Historia'],
    synopsis: 'La continuación de la historia del padre de la bomba atómica.',
    anticipationLevel: 'high',
    distributor: 'Universal',
    runtime: 180,
    isReminded: false,
  },
  {
    id: 3,
    title: 'The Brutalist',
    poster: '/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg',
    releaseDate: new Date('2024-10-30'),
    director: 'Brady Corbet',
    genre: ['Drama'],
    synopsis: 'Un arquitecto húngaro busca reconstruir su vida en América.',
    anticipationLevel: 'medium',
    distributor: 'A24',
    runtime: 215,
    isReminded: false,
  },
]

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export function ReleaseCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedRelease, setSelectedRelease] = useState<MovieRelease | null>(null)
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const [releases, setReleases] = useState(upcomingReleases)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Get releases for current month
  const monthReleases = releases.filter((release) => {
    const releaseMonth = release.releaseDate.getMonth()
    const releaseYear = release.releaseDate.getFullYear()
    return releaseMonth === currentMonth && releaseYear === currentYear
  })

  const toggleReminder = (movieId: number) => {
    setReleases((prev) =>
      prev.map((release) =>
        release.id === movieId ? { ...release, isReminded: !release.isReminded } : release
      )
    )
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayReleases = monthReleases.filter((release) => release.releaseDate.getDate() === day)

      days.push(
        <motion.div
          key={day}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: day * 0.01 }}
          className={cn(
            'aspect-square rounded-lg border p-2 transition-all',
            dayReleases.length > 0
              ? 'cursor-pointer border-white/20 bg-white/5 hover:bg-white/10'
              : 'border-white/5'
          )}
          onClick={() => dayReleases.length > 0 && setSelectedRelease(dayReleases[0])}
        >
          <div className="flex h-full flex-col">
            <span className={cn('text-sm', dayReleases.length > 0 ? 'font-bold' : 'text-gray-500')}>
              {day}
            </span>
            {dayReleases.length > 0 && (
              <div className="flex flex-1 flex-col justify-end gap-1">
                {dayReleases.slice(0, 2).map((release, i) => (
                  <div
                    key={release.id}
                    className={cn(
                      'truncate rounded p-1 text-xs',
                      release.anticipationLevel === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : release.anticipationLevel === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-blue-500/20 text-blue-400'
                    )}
                  >
                    {release.title}
                  </div>
                ))}
                {dayReleases.length > 2 && (
                  <span className="text-xs text-gray-400">+{dayReleases.length - 2} más</span>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )
    }

    return days
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
          <h1 className="mb-4 flex items-center gap-3 text-4xl font-bold md:text-5xl">
            <Calendar className="h-10 w-10" />
            Calendario de Estrenos
          </h1>
          <p className="text-xl text-gray-400">
            No te pierdas los próximos lanzamientos más esperados del cine
          </p>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex gap-2">
            <button
              onClick={() => setView('calendar')}
              className={cn(
                'rounded-lg px-4 py-2 font-medium transition-all',
                view === 'calendar' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'
              )}
            >
              Vista Calendario
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'rounded-lg px-4 py-2 font-medium transition-all',
                view === 'list' ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'
              )}
            >
              Vista Lista
            </button>
          </div>

          {/* Legend */}
          <div className="hidden items-center gap-4 text-sm md:flex">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-red-500/20" />
              <span className="text-gray-400">Alta expectativa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-yellow-500/20" />
              <span className="text-gray-400">Media expectativa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-blue-500/20" />
              <span className="text-gray-400">Estreno regular</span>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'calendar' ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              {/* Calendar Header */}
              <div className="mb-6 flex items-center justify-between">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="rounded-lg p-2 transition-colors hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <h2 className="text-2xl font-bold">
                  {months[currentMonth]} {currentYear}
                </h2>

                <button
                  onClick={() => navigateMonth('next')}
                  className="rounded-lg p-2 transition-colors hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Week Days */}
              <div className="mb-4 grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-400">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {releases
                .sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime())
                .map((release, index) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    <div className="relative aspect-[2/3] w-32 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${release.poster}`}
                        alt={release.title}
                        fill
                        className="object-cover"
                      />
                      <div
                        className={cn(
                          'absolute right-2 top-2 rounded px-2 py-1 text-xs font-medium',
                          release.anticipationLevel === 'high'
                            ? 'bg-red-500 text-white'
                            : release.anticipationLevel === 'medium'
                              ? 'bg-yellow-500 text-black'
                              : 'bg-blue-500 text-white'
                        )}
                      >
                        {release.anticipationLevel === 'high'
                          ? 'MUY ESPERADA'
                          : release.anticipationLevel === 'medium'
                            ? 'ESPERADA'
                            : 'ESTRENO'}
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="mb-1 text-2xl font-bold">{release.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {release.releaseDate.toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Film className="h-4 w-4" />
                            {release.director}
                          </span>
                          {release.runtime && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {release.runtime} min
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="line-clamp-2 text-gray-300">{release.synopsis}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {release.genre.map((g) => (
                            <span key={g} className="rounded-full bg-white/10 px-3 py-1 text-sm">
                              {g}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => toggleReminder(release.id)}
                          className={cn(
                            'flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all',
                            release.isReminded
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-white/10 hover:bg-white/20'
                          )}
                        >
                          {release.isReminded ? (
                            <>
                              <BellOff className="h-4 w-4" />
                              Recordatorio activo
                            </>
                          ) : (
                            <>
                              <Bell className="h-4 w-4" />
                              Recordarme
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Release Modal */}
        <AnimatePresence>
          {selectedRelease && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
              onClick={() => setSelectedRelease(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl rounded-xl bg-gray-900 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex gap-6">
                  <div className="relative aspect-[2/3] w-48 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${selectedRelease.poster}`}
                      alt={selectedRelease.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="mb-2 text-3xl font-bold">{selectedRelease.title}</h2>
                      <div className="flex items-center gap-4 text-gray-400">
                        <span>Dirigida por {selectedRelease.director}</span>
                        <span>•</span>
                        <span>{selectedRelease.distributor}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {selectedRelease.releaseDate.toLocaleDateString('es-ES', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      {selectedRelease.runtime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {selectedRelease.runtime} minutos
                        </span>
                      )}
                    </div>

                    <p className="text-gray-300">{selectedRelease.synopsis}</p>

                    <div className="flex gap-2">
                      {selectedRelease.genre.map((g) => (
                        <span key={g} className="rounded-full bg-white/10 px-3 py-1 text-sm">
                          {g}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleReminder(selectedRelease.id)}
                      className={cn(
                        'w-full rounded-lg py-3 font-medium transition-all',
                        selectedRelease.isReminded
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-white text-black hover:bg-gray-200'
                      )}
                    >
                      {selectedRelease.isReminded ? (
                        <>
                          <BellOff className="mr-2 inline-block h-4 w-4" />
                          Recordatorio activado
                        </>
                      ) : (
                        <>
                          <Bell className="mr-2 inline-block h-4 w-4" />
                          Activar recordatorio
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
