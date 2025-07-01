'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function FilmStripLoader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stripsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        })
      }
    })

    tl.fromTo(
      stripsRef.current,
      {
        yPercent: 100,
        opacity: 0
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }
    )
    .to(
      stripsRef.current,
      {
        yPercent: -100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.in'
      },
      '+=0.3'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="flex h-32 gap-4 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) stripsRef.current[i] = el
            }}
            className="h-full w-20 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 rounded"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                #18181b,
                #18181b 8px,
                #09090b 8px,
                #09090b 16px
              )`
            }}
          />
        ))}
      </div>
    </div>
  )
}