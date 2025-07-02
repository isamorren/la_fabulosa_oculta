'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const quotes = [
  { text: 'Después de todo, mañana será otro día', movie: 'Lo que el viento se llevó' },
  { text: 'Le haré una oferta que no podrá rechazar', movie: 'El Padrino' },
  { text: 'Que la fuerza te acompañe', movie: 'Star Wars' },
  { text: 'Siempre nos quedará París', movie: 'Casablanca' },
  { text: 'La vida es como una caja de chocolates', movie: 'Forrest Gump' },
  { text: 'Hasta el infinito y más allá', movie: 'Toy Story' },
  { text: 'Rosebud', movie: 'Ciudadano Kane' },
  { text: 'No hay lugar como el hogar', movie: 'El Mago de Oz' },
]

export function MovieQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pointer-events-none absolute right-8 top-1/4 max-w-md md:right-16 lg:right-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.8 }}
          className="text-right"
        >
          <blockquote className="mb-2 text-xl font-light italic text-white/80 md:text-2xl">
            "{quotes[currentQuote].text}"
          </blockquote>
          <cite className="text-sm not-italic text-white/60">— {quotes[currentQuote].movie}</cite>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
