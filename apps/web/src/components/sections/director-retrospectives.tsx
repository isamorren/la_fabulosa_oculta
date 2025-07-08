'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Film, Award, Calendar, Quote, ChevronRight, Play, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Director {
  id: string
  name: string
  portrait: string
  birthYear: number
  deathYear?: number
  nationality: string
  biography: string
  signature: string
  awards: string[]
  keyFilms: Array<{
    id: number
    title: string
    year: number
    poster: string
    synopsis: string
  }>
  quotes: string[]
  influences: string[]
  legacy: string
}

const directors: Director[] = [
  {
    id: 'agnes-varda',
    name: 'Agnès Varda',
    portrait: '/director-agnes-varda.jpg',
    birthYear: 1928,
    deathYear: 2019,
    nationality: 'Belga-Francesa',
    biography:
      'Pionera de la Nouvelle Vague y del cine feminista, Varda transformó el lenguaje cinematográfico con su mirada poética y humanista.',
    signature: 'Cineescritura: una fusión única de documental y ficción',
    awards: ['Palma de Oro Honorífica', 'Oscar Honorífico', 'León de Oro'],
    keyFilms: [
      {
        id: 1,
        title: 'Cléo de 5 à 7',
        year: 1962,
        poster: '/kJer1H9FykpXfpWKKe5g6gf6zAI.jpg',
        synopsis:
          'Una cantante espera los resultados de un examen médico durante dos horas en París.',
      },
      {
        id: 2,
        title: 'Vagabond',
        year: 1985,
        poster: '/xXEqHmXXVFJL1vqPjl56HJogOLx.jpg',
        synopsis: 'La historia de una joven vagabunda contada a través de flashbacks.',
      },
      {
        id: 3,
        title: 'The Gleaners and I',
        year: 2000,
        poster: '/dNkV0PvE2E5MqtW7rJOKk1VFMJD.jpg',
        synopsis: 'Un ensayo documental sobre los recolectores en la Francia moderna.',
      },
    ],
    quotes: [
      'Si abres una puerta, tal vez encuentres detrás algo que no esperabas.',
      'El cine no es un trabajo para mí, es mi vida.',
      'Siempre he tratado de mezclar lo trivial con lo esencial.',
    ],
    influences: ['Jean-Luc Godard', 'Jacques Demy', 'Chris Marker'],
    legacy:
      'Su influencia se extiende más allá del cine, inspirando a generaciones de artistas visuales y cineastas feministas.',
  },
  {
    id: 'wong-kar-wai',
    name: 'Wong Kar-wai',
    portrait: '/director-wong-kar-wai.jpg',
    birthYear: 1958,
    nationality: 'Hongkonés',
    biography:
      'Maestro del cine contemplativo y visual, Wong Kar-wai redefinió el cine asiático con su estética única y narrativas fragmentadas sobre el amor y la soledad.',
    signature: 'Estética neon-noir y narrativas no lineales sobre el deseo',
    awards: ['Mejor Director en Cannes', 'BAFTA', 'César Honorífico'],
    keyFilms: [
      {
        id: 4,
        title: 'In the Mood for Love',
        year: 2000,
        poster: '/iYypPT4bhqXfq1b6EnmxvRt6b2Y.jpg',
        synopsis: 'Dos vecinos descubren que sus cónyuges tienen una aventura.',
      },
      {
        id: 5,
        title: 'Chungking Express',
        year: 1994,
        poster: '/43I9DcNoCzpyzK8JCkJYpHqHqGG.jpg',
        synopsis: 'Dos historias de amor entrelazadas en el Hong Kong urbano.',
      },
      {
        id: 6,
        title: '2046',
        year: 2004,
        poster: '/xA9BnXjp9Ry8bs8wGCWNzDU2L.jpg',
        synopsis: 'Un escritor reflexiona sobre sus amores perdidos.',
      },
    ],
    quotes: [
      'Mi trabajo es sobre la memoria y el tiempo. El tiempo perdido, el tiempo recordado.',
      'No hago películas sobre Hong Kong, hago películas en Hong Kong.',
      'El amor es una cuestión de timing.',
    ],
    influences: ['Michelangelo Antonioni', 'Jean-Luc Godard', 'Manuel Puig'],
    legacy:
      'Su estilo visual distintivo ha influenciado el cine contemporáneo global, desde Hollywood hasta el cine independiente.',
  },
]

export function DirectorRetrospectives() {
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null)
  const [hoveredFilm, setHoveredFilm] = useState<number | null>(null)

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
            <User className="h-10 w-10" />
            Retrospectivas de Directores
          </h1>
          <p className="max-w-3xl text-xl text-gray-400">
            Exploramos la vida y obra de los cineastas que han definido el lenguaje del cine, desde
            los maestros clásicos hasta los visionarios contemporáneos.
          </p>
        </motion.div>

        {/* Featured Directors */}
        <div className="space-y-32">
          {directors.map((director, index) => (
            <motion.section
              key={director.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Background Accent */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-white/5 to-transparent blur-3xl" />

              <div className="relative grid items-start gap-12 lg:grid-cols-2">
                {/* Director Info */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className={cn('space-y-6', index % 2 === 1 && 'lg:order-2')}
                >
                  {/* Portrait and Basic Info */}
                  <div className="flex items-start gap-6">
                    <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full bg-white/10">
                      {/* Placeholder for portrait */}
                      <div className="flex h-full w-full items-center justify-center">
                        <User className="h-16 w-16 text-gray-600" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="mb-2 text-3xl font-bold md:text-4xl">{director.name}</h2>
                      <div className="mb-3 flex items-center gap-4 text-gray-400">
                        <span>{director.nationality}</span>
                        <span>•</span>
                        <span>
                          {director.birthYear}
                          {director.deathYear && ` - ${director.deathYear}`}
                        </span>
                      </div>
                      <p className="inline-block rounded-lg bg-white/5 px-4 py-2 text-sm italic text-gray-300">
                        "{director.signature}"
                      </p>
                    </div>
                  </div>

                  {/* Biography */}
                  <div>
                    <p className="text-lg leading-relaxed text-gray-300">{director.biography}</p>
                  </div>

                  {/* Awards */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                      <Award className="h-5 w-5" />
                      Reconocimientos
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {director.awards.map((award, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-500"
                        >
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quotes */}
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                      <Quote className="h-5 w-5" />
                      En sus palabras
                    </h3>
                    <div className="space-y-3">
                      {director.quotes.slice(0, 2).map((quote, i) => (
                        <blockquote
                          key={i}
                          className="border-l-2 border-white/20 pl-4 italic text-gray-300"
                        >
                          "{quote}"
                        </blockquote>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setSelectedDirector(director)}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-gray-200"
                  >
                    Ver retrospectiva completa
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>

                {/* Key Films */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className={cn('space-y-6', index % 2 === 1 && 'lg:order-1')}
                >
                  <h3 className="flex items-center gap-2 text-2xl font-bold">
                    <Film className="h-6 w-6" />
                    Obras Esenciales
                  </h3>

                  <div className="space-y-4">
                    {director.keyFilms.map((film, filmIndex) => (
                      <motion.div
                        key={film.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + filmIndex * 0.1 }}
                        className="group cursor-pointer"
                        onMouseEnter={() => setHoveredFilm(film.id)}
                        onMouseLeave={() => setHoveredFilm(null)}
                      >
                        <div className="flex gap-4 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10">
                          <div className="relative aspect-[2/3] w-24 flex-shrink-0 overflow-hidden rounded">
                            <Image
                              src={`https://image.tmdb.org/t/p/w200${film.poster}`}
                              alt={film.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="mb-2 flex items-start justify-between">
                              <div>
                                <h4 className="text-lg font-semibold transition-colors group-hover:text-white">
                                  {film.title}
                                </h4>
                                <p className="text-sm text-gray-400">{film.year}</p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-white" />
                            </div>

                            <AnimatePresence>
                              {hoveredFilm === film.id && (
                                <motion.p
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden text-sm text-gray-300"
                                >
                                  {film.synopsis}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Legacy */}
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm">
                    <h4 className="mb-2 font-semibold">Legado e Influencia</h4>
                    <p className="text-gray-300">{director.legacy}</p>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* More Directors Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <h2 className="mb-8 text-3xl font-bold">Más Retrospectivas</h2>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {[
              'Terrence Malick',
              'Claire Denis',
              'Apichatpong Weerasethakul',
              'Kelly Reichardt',
              'Paul Thomas Anderson',
              'Lynne Ramsay',
              'Ari Aster',
              'Chloé Zhao',
            ].map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-white/5 transition-all hover:bg-white/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="h-20 w-20 text-gray-700" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="font-semibold">{name}</p>
                    <p className="text-sm text-gray-400">Próximamente</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
