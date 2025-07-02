'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface PageHeaderProps {
  title: string
  description?: string
  backgroundImage?: string
}

export function PageHeader({ title, description, backgroundImage }: PageHeaderProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section
      ref={ref}
      className="relative flex min-h-[40vh] items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="to-background absolute inset-0 bg-gradient-to-b from-black/50 via-black/30" />

      {backgroundImage && (
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: inView ? 1 : 1.1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 -z-10"
        >
          <img src={backgroundImage} alt="" className="h-full w-full object-cover" />
        </motion.div>
      )}

      {/* Content */}
      <div className="container mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg text-gray-400 md:text-xl"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  )
}
