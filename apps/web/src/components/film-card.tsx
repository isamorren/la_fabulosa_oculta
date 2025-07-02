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
      <Link href={`/posts/${post.slug}`} className="block h-full">
        <Card className="group h-full cursor-pointer overflow-hidden">
          <div className="bg-muted relative aspect-[2/3] overflow-hidden">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent" />
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Placeholder for film poster */}
              <div className="h-full w-full bg-gradient-to-br from-zinc-700 to-zinc-900" />
            </motion.div>
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <h3 className="mb-1 line-clamp-2 text-xl font-bold text-white">{post.film}</h3>
              <p className="text-sm text-white/80">{post.director}</p>
            </div>
          </div>

          <CardContent className="p-4">
            <h4 className="group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors">
              {post.title}
            </h4>
            <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">{post.excerpt}</p>

            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-yellow-500" />
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
                <span key={tag} className="bg-secondary rounded-full px-2 py-1 text-xs">
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
