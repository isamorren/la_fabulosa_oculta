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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-600"
          >
            LA FABULOSA OCULTA
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12"
          >
            Análisis cinematográfico con perspectiva curatorial
          </motion.p>
          
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-card/50 backdrop-blur-md rounded-lg p-8 mb-8"
            >
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                Crítica destacada
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {featuredPost.title}
              </h3>
              <p className="text-muted-foreground mb-6 line-clamp-2">
                {featuredPost.excerpt}
              </p>
              <div className="flex gap-4 justify-center">
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
            className="text-sm text-muted-foreground"
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