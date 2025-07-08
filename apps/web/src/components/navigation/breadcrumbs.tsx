'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { motion } from 'framer-motion'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumbs() {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    paths.forEach((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/')

      // Format label
      let label = path
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      // Custom labels for specific routes
      const customLabels: Record<string, string> = {
        peliculas: 'Películas',
        pelicula: 'Película',
        genero: 'Género',
        decada: 'Década',
        lista: 'Lista',
        directores: 'Directores',
        sobre: 'Sobre',
      }

      if (customLabels[path]) {
        label = customLabels[path]
      }

      breadcrumbs.push({
        label,
        href: index === paths.length - 1 ? undefined : href,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  // Don't show on home page
  if (pathname === '/') return null

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-6 py-4">
      <motion.ol
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm"
      >
        {/* Home */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-400 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Inicio</span>
          </Link>
        </li>

        {breadcrumbs.length > 0 && (
          <li className="text-gray-600">
            <ChevronRight className="h-4 w-4" />
          </li>
        )}

        {/* Path items */}
        {breadcrumbs.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            {item.href ? (
              <>
                <Link href={item.href} className="text-gray-400 transition-colors hover:text-white">
                  {item.label}
                </Link>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                )}
              </>
            ) : (
              <span className="font-medium text-white">{item.label}</span>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </nav>
  )
}
