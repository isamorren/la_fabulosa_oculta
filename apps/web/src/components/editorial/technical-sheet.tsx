'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Film, Camera, Music, Palette, Users, DollarSign, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TechnicalSheetProps {
  movie: {
    director?: string
    cinematographer?: string
    composer?: string
    productionDesigner?: string
    editor?: string
    writer?: string
    producers?: string[]
    cast?: Array<{ name: string; character: string }>
    country?: string
    language?: string
    releaseDate?: string
    runtime?: number
    budget?: number
    boxOffice?: number
    awards?: string[]
    productionCompanies?: string[]
    distributor?: string
    rating?: string
    aspectRatio?: string
    soundMix?: string
    color?: string
  }
}

export function TechnicalSheet({ movie }: TechnicalSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const sections = [
    {
      title: 'Equipo Principal',
      icon: Film,
      items: [
        { label: 'Director', value: movie.director },
        { label: 'Guion', value: movie.writer },
        { label: 'Fotografía', value: movie.cinematographer },
        { label: 'Música', value: movie.composer },
        { label: 'Diseño de Producción', value: movie.productionDesigner },
        { label: 'Montaje', value: movie.editor },
      ].filter((item) => item.value),
    },
    {
      title: 'Producción',
      icon: Camera,
      items: [
        { label: 'Productoras', value: movie.productionCompanies?.join(', ') },
        { label: 'Distribuidora', value: movie.distributor },
        { label: 'País', value: movie.country },
        { label: 'Idioma', value: movie.language },
      ].filter((item) => item.value),
    },
    {
      title: 'Información Técnica',
      icon: Palette,
      items: [
        { label: 'Duración', value: movie.runtime ? `${movie.runtime} minutos` : undefined },
        { label: 'Formato', value: movie.aspectRatio },
        { label: 'Sonido', value: movie.soundMix },
        { label: 'Color', value: movie.color },
        { label: 'Clasificación', value: movie.rating },
      ].filter((item) => item.value),
    },
    {
      title: 'Datos Financieros',
      icon: DollarSign,
      items: [
        {
          label: 'Presupuesto',
          value: movie.budget ? `$${movie.budget.toLocaleString()}` : undefined,
        },
        {
          label: 'Taquilla',
          value: movie.boxOffice ? `$${movie.boxOffice.toLocaleString()}` : undefined,
        },
      ].filter((item) => item.value),
    },
  ]

  const hasAwards = movie.awards && movie.awards.length > 0
  const hasCast = movie.cast && movie.cast.length > 0

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-6 transition-colors hover:bg-white/5"
      >
        <h3 className="flex items-center gap-2 text-xl font-bold">
          <Film className="h-6 w-6" />
          Ficha Técnica
        </h3>
        <ChevronDown
          className={cn('h-5 w-5 transition-transform duration-300', isExpanded && 'rotate-180')}
        />
      </button>

      {/* Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-6 px-6 pb-6">
              {/* Main Sections */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {sections.map((section, sectionIndex) => {
                  const Icon = section.icon
                  return (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sectionIndex * 0.1 }}
                    >
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-400">
                        <Icon className="h-4 w-4" />
                        {section.title}
                      </h4>
                      <dl className="space-y-2">
                        {section.items.map((item, index) => (
                          <div key={index} className="grid grid-cols-3 gap-2 text-sm">
                            <dt className="text-gray-500">{item.label}:</dt>
                            <dd className="col-span-2 font-medium">{item.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  )
                })}
              </div>

              {/* Cast Section */}
              {hasCast && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-400">
                    <Users className="h-4 w-4" />
                    Reparto Principal
                  </h4>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {movie.cast!.slice(0, 10).map((actor, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="font-medium">{actor.name}</span>
                        <span className="text-gray-400">{actor.character}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Awards Section */}
              {hasAwards && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-400">
                    <Award className="h-4 w-4" />
                    Premios y Reconocimientos
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.awards!.map((award, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-500"
                      >
                        {award}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
