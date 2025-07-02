'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface FilmGridProps {
  children: ReactNode
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function FilmGrid({ children }: FilmGridProps) {
  const [parent] = useAutoAnimate()

  return (
    <motion.div
      ref={parent}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {children}
    </motion.div>
  )
}
