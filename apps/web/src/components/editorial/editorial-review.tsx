'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, Bookmark, Share2, Clock } from 'lucide-react'

interface EditorialReviewProps {
  title: string
  subtitle?: string
  author: string
  date: string
  readingTime: number
  content: string
  pullQuotes?: string[]
  featuredImage?: string
}

export function EditorialReview({
  title,
  subtitle,
  author,
  date,
  readingTime,
  content,
  pullQuotes = [],
  featuredImage,
}: EditorialReviewProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('editorial-content')
      if (!element) return

      const rect = element.getBoundingClientRect()
      const scrolled = -rect.top
      const height = rect.height - window.innerHeight
      const percentage = Math.min(Math.max((scrolled / height) * 100, 0), 100)
      setProgress(percentage)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Split content into paragraphs
  const paragraphs = content.split('\n\n')
  const firstParagraph = paragraphs[0]
  const restParagraphs = paragraphs.slice(1)

  return (
    <article id="editorial-content" className="mx-auto max-w-4xl">
      {/* Progress Bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Header */}
      <header className="mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-xl text-gray-400 md:text-2xl"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 text-sm text-gray-400"
        >
          <span>
            Por <strong className="text-white">{author}</strong>
          </span>
          <span>•</span>
          <time>{date}</time>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {readingTime} min de lectura
          </span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex gap-4"
        >
          <button className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/20">
            <Bookmark className="h-4 w-4" />
            <span>Guardar</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/20">
            <Share2 className="h-4 w-4" />
            <span>Compartir</span>
          </button>
        </motion.div>
      </header>

      {/* Featured Image */}
      {featuredImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12 overflow-hidden rounded-xl"
        >
          <img src={featuredImage} alt={title} className="h-auto w-full" />
        </motion.div>
      )}

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        {/* First Letter Drop Cap */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6 text-lg leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:bg-gradient-to-br first-letter:from-blue-500 first-letter:to-purple-500 first-letter:bg-clip-text first-letter:text-7xl first-letter:font-bold first-letter:text-transparent"
        >
          {firstParagraph}
        </motion.p>

        {/* Rest of content with pull quotes */}
        {restParagraphs.map((paragraph, index) => {
          const shouldShowPullQuote = pullQuotes[Math.floor(index / 3)] && index % 3 === 0
          const pullQuote = pullQuotes[Math.floor(index / 3)]

          return (
            <div key={index}>
              {shouldShowPullQuote && pullQuote && (
                <motion.aside
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="float-left mb-6 mr-8 w-full md:w-1/3"
                >
                  <blockquote className="border-l-4 border-blue-500 py-2 pl-6">
                    <Quote className="mb-2 h-8 w-8 text-blue-500/30" />
                    <p className="text-2xl font-light italic text-gray-300">{pullQuote}</p>
                  </blockquote>
                </motion.aside>
              )}

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-6 text-lg leading-relaxed text-gray-300"
              >
                {paragraph}
              </motion.p>
            </div>
          )
        })}
      </div>

      {/* Author Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
      >
        <h4 className="mb-2 font-semibold">Sobre el autor</h4>
        <p className="text-gray-400">
          {author} es crítico de cine y ensayista en La Fabulosa Oculta. Sus análisis exploran la
          intersección entre el cine de autor y las corrientes culturales contemporáneas.
        </p>
      </motion.div>
    </article>
  )
}
