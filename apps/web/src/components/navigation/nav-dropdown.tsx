'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavDropdownProps {
  label: string
  items: Array<{
    label: string
    href: string
    description?: string
  }>
  isActive?: boolean
}

export function NavDropdown({ label, items, isActive }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger */}
      <button
        className={cn(
          'flex items-center gap-1 py-2 text-sm font-medium transition-colors',
          isActive ? 'text-white' : 'text-gray-400 hover:text-white'
        )}
      >
        {label}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Invisible bridge to prevent gap */}
            <div className="absolute inset-x-0 top-full h-4" />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl"
            >
              <div className="py-2">
                {items.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="group block px-4 py-3 transition-colors hover:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="font-medium text-white transition-colors group-hover:text-blue-400">
                        {item.label}
                      </div>
                      {item.description && (
                        <div className="mt-1 text-xs text-gray-400">{item.description}</div>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
