'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Film, Search, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MagneticButton } from './magnetic-button'
import { MobileMenu } from './mobile-menu'
import { SearchCommand } from './search-command'
import { NavDropdown } from './nav-dropdown'
import { navigationData } from '@/data/navigation'

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/peliculas', label: 'Películas' },
  { href: '/series', label: 'Series' },
  { href: '/directores', label: 'Directores' },
  { href: '/sobre', label: 'Sobre' },
]

export function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { scrollY } = useScroll()

  const headerOpacity = useTransform(scrollY, [0, 100], [0.97, 1])
  const headerBlur = useTransform(scrollY, [0, 100], [10, 20])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
          isScrolled ? 'py-4' : 'py-6'
        )}
        style={{
          backgroundColor: `rgba(10, 10, 10, ${headerOpacity.get()})`,
          backdropFilter: `blur(${headerBlur.get()}px)`,
          WebkitBackdropFilter: `blur(${headerBlur.get()}px)`,
        }}
      >
        <nav className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="relative">
            <motion.div
              className="flex items-center gap-2 text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Film className="h-8 w-8" />
              </motion.div>
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                La Fabulosa Oculta
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-6">
              {/* Regular Nav Items */}
              <li>
                <MagneticButton>
                  <Link
                    href="/"
                    className={cn(
                      'relative py-2 text-sm font-medium transition-colors',
                      pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'
                    )}
                  >
                    Inicio
                    {pathname === '/' && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </MagneticButton>
              </li>

              {/* Películas Dropdown */}
              <li>
                <NavDropdown
                  label="Películas"
                  items={[
                    { label: 'Todas las películas', href: '/peliculas' },
                    { label: 'En cartelera', href: '/peliculas/cartelera' },
                    { label: 'Próximos estrenos', href: '/peliculas/proximos' },
                    { label: 'Mejor valoradas', href: '/peliculas/top' },
                  ]}
                  isActive={pathname.startsWith('/peliculas')}
                />
              </li>

              {/* Géneros Dropdown */}
              <li>
                <NavDropdown
                  label="Géneros"
                  items={navigationData.genres}
                  isActive={pathname.startsWith('/genero')}
                />
              </li>

              {/* Décadas Dropdown */}
              <li>
                <NavDropdown
                  label="Décadas"
                  items={navigationData.decades}
                  isActive={pathname.startsWith('/decada')}
                />
              </li>

              {/* Listas Dropdown */}
              <li>
                <NavDropdown
                  label="Listas"
                  items={[
                    { label: 'Listas temáticas', href: '/listas' },
                    { label: 'Mi filmoteca', href: '/filmoteca' },
                    ...navigationData.curatedLists,
                  ]}
                  isActive={
                    pathname.startsWith('/lista') ||
                    pathname === '/listas' ||
                    pathname === '/filmoteca'
                  }
                />
              </li>

              {/* Más Dropdown */}
              <li>
                <NavDropdown
                  label="Más"
                  items={[
                    { label: 'Directores', href: '/directores' },
                    { label: 'Calendario de estrenos', href: '/calendario' },
                    { label: 'Escenas icónicas', href: '/escenas' },
                    { label: 'Sobre nosotros', href: '/sobre' },
                  ]}
                  isActive={
                    pathname === '/directores' ||
                    pathname === '/calendario' ||
                    pathname === '/escenas' ||
                    pathname === '/sobre'
                  }
                />
              </li>
            </ul>

            {/* Search Button */}
            <MagneticButton>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-400 transition-all hover:bg-white/10 hover:text-white"
              >
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Buscar</span>
                <kbd className="ml-2 hidden rounded bg-white/10 px-1.5 py-0.5 text-xs lg:inline">
                  ⌘K
                </kbd>
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
      />

      {/* Search Command Palette */}
      <SearchCommand isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
