'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@ui/components/card'
import { Star, Calendar, Clock } from 'lucide-react'
import type { Post } from 'contentlayer/generated'

interface FilmCardProps {
  post: Post
  index?: number
}

export function FilmCard({ post, index = 0 }: FilmCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      data-testid="film-card"
    >
      <Link href={`/films/${post.slug}`} className="block h-full">
        <Card className="h-full overflow-hidden group cursor-pointer">
          <div className="aspect-[2/3] relative overflow-hidden bg-muted">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Placeholder for film poster */}
              <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
            </motion.div>
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <h3 className="text-white font-bold text-xl mb-1 line-clamp-2">
                {post.film}
              </h3>
              <p className="text-white/80 text-sm">{post.director}</p>
            </div>
          </div>
          
          <CardContent className="p-4">
            <h4 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h4>
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
              {post.excerpt}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>{post.rating}/5</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.year}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="px-4 pb-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-secondary rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}