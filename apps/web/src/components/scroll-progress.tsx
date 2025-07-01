'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!progressRef.current) return

    gsap.to(progressRef.current, {
      scaleX: 1,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-zinc-900">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-zinc-500 to-zinc-300 origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}