'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 20, stiffness: 1500 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const checkCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink = target.closest('a, button, [role="button"]')
      setIsPointer(!!isLink)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', checkCursorType)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', checkCursorType)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Cursor principal */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-white"
          animate={{
            scale: isPointer ? 1.5 : 1,
            backgroundColor: isPointer ? '#3b82f6' : '#ffffff',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Estilo para ocultar cursor nativo */}
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  )
}
