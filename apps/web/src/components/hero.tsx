'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@ui/components/button'
import { ArrowRight, Play } from 'lucide-react'
import type { Post } from 'contentlayer/generated'

interface HeroProps {
  featuredPost: Post
}

export function Hero({ featuredPost }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="via-background/50 to-background absolute inset-0 z-10 bg-gradient-to-b from-transparent" />

      <div className="container relative z-20 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 bg-gradient-to-r from-zinc-200 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
          >
            LA FABULOSA OCULTA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground mb-12 text-xl md:text-2xl"
          >
            Análisis cinematográfico con perspectiva curatorial
          </motion.p>

          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-card/50 mb-8 rounded-lg p-8 backdrop-blur-md"
            >
              <h2 className="text-muted-foreground mb-2 text-sm uppercase tracking-wider">
                Crítica destacada
              </h2>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">{featuredPost.title}</h3>
              <p className="text-muted-foreground mb-6 line-clamp-2">{featuredPost.excerpt}</p>
              <div className="flex justify-center gap-4">
                <Link href={`/films/${featuredPost.slug}`}>
                  <Button size="lg" className="group">
                    Leer crítica
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Ver trailer
                </Button>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-muted-foreground text-sm"
          >
            <p>Scroll para explorar</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-2"
            >
              ↓
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
