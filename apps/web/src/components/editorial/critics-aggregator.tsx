'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CriticReview {
  source: string
  author: string
  quote: string
  sentiment: 'positive' | 'mixed' | 'negative'
  url?: string
}

interface CriticsAggregatorProps {
  reviews: CriticReview[]
  consensus?: string
}

const mockReviews: CriticReview[] = [
  {
    source: 'The Guardian',
    author: 'Peter Bradshaw',
    quote: 'Una obra maestra visual que redefine los límites del cine contemporáneo.',
    sentiment: 'positive',
  },
  {
    source: 'Variety',
    author: 'Owen Gleiberman',
    quote:
      'Ambiciosa en su alcance pero irregular en su ejecución. Un espectáculo fascinante aunque imperfecto.',
    sentiment: 'mixed',
  },
  {
    source: 'The New York Times',
    author: 'A.O. Scott',
    quote: 'Una exploración profunda de la condición humana envuelta en imágenes hipnóticas.',
    sentiment: 'positive',
  },
  {
    source: 'IndieWire',
    author: 'David Ehrlich',
    quote: 'Pretenciosa y vacía, una película que confunde estilo con sustancia.',
    sentiment: 'negative',
  },
]

export function CriticsAggregator({ reviews = mockReviews, consensus }: CriticsAggregatorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filter, setFilter] = useState<'all' | 'positive' | 'mixed' | 'negative'>('all')

  const filteredReviews = reviews.filter(
    (review) => filter === 'all' || review.sentiment === filter
  )

  const sentimentCounts = {
    positive: reviews.filter((r) => r.sentiment === 'positive').length,
    mixed: reviews.filter((r) => r.sentiment === 'mixed').length,
    negative: reviews.filter((r) => r.sentiment === 'negative').length,
  }

  const totalReviews = reviews.length
  const positivePercentage = Math.round((sentimentCounts.positive / totalReviews) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-2xl font-bold">
          <Quote className="h-6 w-6" />
          La crítica dice
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          {isExpanded ? 'Ver menos' : `Ver todas (${totalReviews})`}
          <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')} />
        </button>
      </div>

      {/* Consensus Score */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-6 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{positivePercentage}%</p>
            <p className="text-gray-400">Aprobación crítica</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-green-500" />
              <span className="font-semibold">{sentimentCounts.positive}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full border-2 border-yellow-500 bg-yellow-500/20" />
              <span className="font-semibold">{sentimentCounts.mixed}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsDown className="h-5 w-5 text-red-500" />
              <span className="font-semibold">{sentimentCounts.negative}</span>
            </div>
          </div>
        </div>

        {consensus && (
          <p className="border-l-4 border-white/20 pl-4 italic text-gray-300">"{consensus}"</p>
        )}
      </div>

      {/* Filter Buttons */}
      {isExpanded && (
        <div className="flex gap-2">
          {(['all', 'positive', 'mixed', 'negative'] as const).map((filterType) => (
            <motion.button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                filter === filterType ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterType === 'all'
                ? 'Todas'
                : filterType === 'positive'
                  ? 'Positivas'
                  : filterType === 'mixed'
                    ? 'Mixtas'
                    : 'Negativas'}
            </motion.button>
          ))}
        </div>
      )}

      {/* Reviews List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          {filteredReviews.slice(0, isExpanded ? undefined : 3).map((review, index) => (
            <motion.div
              key={`${review.source}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'rounded-lg border p-4 transition-all hover:bg-white/5',
                review.sentiment === 'positive' && 'border-green-500/30 bg-green-500/5',
                review.sentiment === 'mixed' && 'border-yellow-500/30 bg-yellow-500/5',
                review.sentiment === 'negative' && 'border-red-500/30 bg-red-500/5'
              )}
            >
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="font-semibold">{review.source}</p>
                  <p className="text-sm text-gray-400">{review.author}</p>
                </div>
                <div
                  className={cn(
                    'rounded p-1',
                    review.sentiment === 'positive' && 'text-green-500',
                    review.sentiment === 'mixed' && 'text-yellow-500',
                    review.sentiment === 'negative' && 'text-red-500'
                  )}
                >
                  {review.sentiment === 'positive' ? (
                    <ThumbsUp className="h-4 w-4" />
                  ) : review.sentiment === 'negative' ? (
                    <ThumbsDown className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-current" />
                  )}
                </div>
              </div>
              <blockquote className="italic text-gray-300">"{review.quote}"</blockquote>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
