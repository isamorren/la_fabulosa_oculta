'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Film, Calendar, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SearchCommandProps {
  isOpen: boolean
  onClose: () => void
}

// Mock data - reemplazar con datos reales
const mockResults = [
  { id: 1, title: 'Oppenheimer', year: 2023, rating: 8.5, type: 'película' },
  { id: 2, title: 'Barbie', year: 2023, rating: 7.8, type: 'película' },
  { id: 3, title: 'The Last of Us', year: 2023, rating: 9.0, type: 'serie' },
]

export function SearchCommand({ isOpen, onClose }: SearchCommandProps) {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(mockResults)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setSearch('')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSelect = (result: (typeof mockResults)[0]) => {
    router.push(`/peliculas/${result.id}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/90 shadow-2xl backdrop-blur-xl"
          >
            {/* Search Input */}
            <div className="flex items-center border-b border-white/10 px-6 py-4">
              <Search className="mr-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar películas, series, directores..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                autoFocus
              />
              <button
                onClick={onClose}
                className="ml-3 rounded-lg p-1 transition-colors hover:bg-white/10"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                <div className="p-2">
                  {results.map((result, index) => (
                    <motion.button
                      key={result.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelect(result)}
                      className="group flex w-full items-center gap-4 rounded-lg p-3 text-left transition-colors hover:bg-white/10"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/20">
                        <Film className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{result.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {result.year}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            {result.rating}
                          </span>
                          <span className="capitalize">{result.type}</span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400">No se encontraron resultados</div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/10 px-6 py-3 text-xs text-gray-400">
              <span>Presiona ESC para cerrar</span>
              <span>↑↓ para navegar • Enter para seleccionar</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
