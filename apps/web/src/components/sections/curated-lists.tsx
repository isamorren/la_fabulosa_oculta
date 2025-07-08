'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Film,
  Heart,
  Brain,
  Zap,
  Moon,
  Sun,
  Globe,
  Clock,
  ChevronRight,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CuratedList {
  id: string
  title: string
  subtitle: string
  description: string
  icon: any
  color: string
  movieCount: number
  lastUpdated: Date
  curator: string
  featured: boolean
  movies: Array<{
    id: number
    title: string
    poster: string
    year: number
  }>
}

const curatedLists: CuratedList[] = [
  {
    id: 'neo-noir-moderno',
    title: 'Neo-Noir Moderno',
    subtitle: 'La oscuridad reimaginada',
    description:
      'Una selección de películas que reinventan el género noir con sensibilidades contemporáneas, explorando la alienación urbana y la ambigüedad moral en el siglo XXI.',
    icon: Moon,
    color: 'from-purple-600 to-blue-600',
    movieCount: 24,
    lastUpdated: new Date('2024-01-15'),
    curator: 'María González',
    featured: true,
    movies: [
      { id: 1, title: 'Drive', poster: '/602vevIURmpDfzbnv5Ubi6wIkQm.jpg', year: 2011 },
      { id: 2, title: 'Blade Runner 2049', poster: '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', year: 2017 },
      { id: 3, title: 'Nightcrawler', poster: '/j9HrX8f7GbZQm1BrBiR40uFQZSb.jpg', year: 2014 },
      { id: 4, title: 'Under the Skin', poster: '/dRiDXh6jlXbAUZsFBTRjfKCVhBh.jpg', year: 2013 },
    ],
  },
  {
    id: 'cine-latinoamericano-emergente',
    title: 'Voces Latinas Emergentes',
    subtitle: 'El nuevo cine latinoamericano',
    description:
      'Directores que están redefiniendo el lenguaje cinematográfico desde América Latina, con historias que trascienden fronteras.',
    icon: Globe,
    color: 'from-orange-600 to-red-600',
    movieCount: 18,
    lastUpdated: new Date('2024-01-12'),
    curator: 'Carlos Mendoza',
    featured: true,
    movies: [
      { id: 5, title: 'Roma', poster: '/dtIIyQyALk57ko5bjac7hi01YQ.jpg', year: 2018 },
      { id: 6, title: 'Bacurau', poster: '/lvoMDNs0NEOi8TyVvdaYKUJVrOj.jpg', year: 2019 },
      { id: 7, title: 'Monos', poster: '/zJzbwOotk8UqZPQUOKnfKo6lqBr.jpg', year: 2019 },
      { id: 8, title: 'La Llorona', poster: '/5iGBOGb9xPJxaw8GVPlTxIrBOLy.jpg', year: 2019 },
    ],
  },
  {
    id: 'slow-cinema',
    title: 'Slow Cinema',
    subtitle: 'La contemplación como arte',
    description:
      'Películas que abrazan el tiempo y el silencio, invitando a una experiencia meditativa del cine.',
    icon: Clock,
    color: 'from-green-600 to-teal-600',
    movieCount: 15,
    lastUpdated: new Date('2024-01-10'),
    curator: 'Ana Lucía Pérez',
    featured: false,
    movies: [
      { id: 9, title: 'Jeanne Dielman', poster: '/fQsGwpMgQX5K8mJdKvi0Cy1e1rf.jpg', year: 1975 },
      { id: 10, title: 'Uncle Boonmee', poster: '/8KwefHGzgBUxzbI9cVY8Dk7hGvV.jpg', year: 2010 },
      {
        id: 11,
        title: 'Cemetery of Splendour',
        poster: '/xhhQ0k6j5CGxXFI85bW9hAXi20i.jpg',
        year: 2015,
      },
    ],
  },
  {
    id: 'sci-fi-filosofico',
    title: 'Ciencia Ficción Filosófica',
    subtitle: 'Ideas que trascienden',
    description:
      'Cuando la ciencia ficción se convierte en un vehículo para explorar las grandes preguntas de la existencia.',
    icon: Brain,
    color: 'from-indigo-600 to-purple-600',
    movieCount: 20,
    lastUpdated: new Date('2024-01-08'),
    curator: 'Roberto Silva',
    featured: false,
    movies: [
      { id: 12, title: 'Arrival', poster: '/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg', year: 2016 },
      { id: 13, title: 'Annihilation', poster: '/4YRplSk6BhH6PRuE9gfyw9byUJ6.jpg', year: 2018 },
      { id: 14, title: 'Ex Machina', poster: '/9goPE2IoMIXxTLWzl7aizwuIiLh.jpg', year: 2014 },
    ],
  },
]

export function CuratedLists() {
  const [selectedList, setSelectedList] = useState<CuratedList | null>(null)
  const [hoveredList, setHoveredList] = useState<string | null>(null)

  const featuredLists = curatedLists.filter((list) => list.featured)
  const regularLists = curatedLists.filter((list) => !list.featured)

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
            <Sparkles className="h-10 w-10" />
            Listas Temáticas
          </h1>
          <p className="max-w-3xl text-xl text-gray-400">
            Colecciones cuidadosamente curadas por nuestros críticos, explorando temas, géneros y
            movimientos cinematográficos.
          </p>
        </motion.div>

        {/* Featured Lists */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-2xl font-bold"
          >
            Listas Destacadas
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2">
            {featuredLists.map((list, index) => {
              const Icon = list.icon

              return (
                <motion.div
                  key={list.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredList(list.id)}
                  onMouseLeave={() => setHoveredList(null)}
                  onClick={() => setSelectedList(list)}
                >
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm transition-all hover:border-white/20">
                    {/* Background Gradient */}
                    <div
                      className={cn(
                        'absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity group-hover:opacity-30',
                        list.color
                      )}
                    />

                    {/* Content */}
                    <div className="relative p-8">
                      <div className="mb-6 flex items-start justify-between">
                        <div>
                          <div className="mb-2 flex items-center gap-3">
                            <div className={cn('rounded-lg bg-gradient-to-br p-3', list.color)}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-sm text-gray-400">
                              {list.movieCount} películas
                            </span>
                          </div>
                          <h3 className="mb-1 text-2xl font-bold">{list.title}</h3>
                          <p className="text-gray-400">{list.subtitle}</p>
                        </div>
                        <ChevronRight className="h-6 w-6 text-gray-400 transition-colors group-hover:text-white" />
                      </div>

                      <p className="mb-6 line-clamp-2 text-gray-300">{list.description}</p>

                      {/* Movie Previews */}
                      <div className="mb-4 flex gap-2">
                        {list.movies.slice(0, 4).map((movie, i) => (
                          <motion.div
                            key={movie.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                              opacity: hoveredList === list.id ? 1 : 0.8,
                              scale: hoveredList === list.id ? 1 : 0.95,
                            }}
                            transition={{ delay: i * 0.05 }}
                            className="relative h-24 w-16 overflow-hidden rounded"
                          >
                            <Image
                              src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                              alt={movie.title}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        ))}
                        <div className="flex h-24 w-16 items-center justify-center rounded bg-white/10">
                          <span className="text-xs text-gray-400">+{list.movieCount - 4}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>Curada por {list.curator}</span>
                        <span>Actualizada {list.lastUpdated.toLocaleDateString('es-ES')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Regular Lists */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-2xl font-bold"
          >
            Más Listas Curadas
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {regularLists.map((list, index) => {
              const Icon = list.icon

              return (
                <motion.div
                  key={list.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedList(list)}
                >
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
                    <div className="mb-4 flex items-center gap-3">
                      <div className={cn('rounded-lg bg-gradient-to-br p-2', list.color)}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-sm text-gray-400">{list.movieCount} películas</span>
                    </div>

                    <h3 className="mb-2 text-xl font-bold">{list.title}</h3>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-400">{list.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{list.curator}</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Add more lists CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="mb-4 text-gray-400">¿Tienes una idea para una lista temática?</p>
          <button className="rounded-lg bg-white/10 px-6 py-3 font-medium transition-colors hover:bg-white/20">
            Sugiere una lista
          </button>
        </motion.div>
      </div>
    </div>
  )
}
