'use client'

import { motion } from 'framer-motion'
import { Flame, Heart, Brain, Eye, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ConceptualRatingProps {
  emotional: number // 0-100
  intellectual: number // 0-100
  visual: number // 0-100
  narrative: number // 0-100
  overall: number // 0-100
}

const ratingCategories = [
  {
    key: 'emotional',
    label: 'Impacto Emocional',
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    description: 'La capacidad de conmover y resonar',
  },
  {
    key: 'intellectual',
    label: 'Profundidad Intelectual',
    icon: Brain,
    color: 'from-purple-500 to-indigo-500',
    description: 'Complejidad temática y reflexiva',
  },
  {
    key: 'visual',
    label: 'Excelencia Visual',
    icon: Eye,
    color: 'from-blue-500 to-cyan-500',
    description: 'Cinematografía y dirección artística',
  },
  {
    key: 'narrative',
    label: 'Narrativa',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-500',
    description: 'Estructura y desarrollo de la historia',
  },
]

export function ConceptualRating({
  emotional,
  intellectual,
  visual,
  narrative,
  overall,
}: ConceptualRatingProps) {
  const ratings = { emotional, intellectual, visual, narrative }

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="relative inline-block"
        >
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-5xl font-bold text-transparent">
              {overall}
            </div>
          </div>
          <Flame className="absolute -right-2 -top-2 h-8 w-8 animate-pulse text-orange-500" />
        </motion.div>
        <p className="mt-4 text-lg text-gray-400">Puntuación La Fabulosa Oculta</p>
      </div>

      {/* Individual Ratings */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {ratingCategories.map((category, index) => {
          const Icon = category.icon
          const value = ratings[category.key as keyof typeof ratings]

          return (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h4 className="mb-1 text-lg font-semibold">{category.label}</h4>
                  <p className="text-sm text-gray-400">{category.description}</p>
                </div>
                <div className={cn('rounded-lg bg-gradient-to-br p-3', category.color)}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={cn('h-full bg-gradient-to-r', category.color)}
                  />
                </div>
                <span className="absolute -top-6 right-0 text-sm font-medium">{value}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Rating Philosophy */}
      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
        <p className="text-sm italic text-gray-400">
          "Nuestro sistema de calificación va más allá de las estrellas tradicionales. Evaluamos
          cada película como una experiencia holística que abraza tanto el corazón como la mente."
        </p>
      </div>
    </div>
  )
}
