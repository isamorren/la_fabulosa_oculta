'use client'

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { FloatingThumbnails } from './home/floating-thumbnails'
import { TMDBMovie } from '@/lib/tmdb/types'

interface AnimatedSphereProps {
  hoveredMovie: TMDBMovie | null
}

function AnimatedSphere({ hoveredMovie }: AnimatedSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)

  // Colores dinámicos basados en el género de la película
  const getColorFromMovie = (movie: TMDBMovie | null) => {
    if (!movie) return '#0f0f0f'

    // Mapeo básico de géneros a colores (puedes expandir esto)
    const genreColors: Record<number, string> = {
      28: '#ff0000', // Action - Rojo
      12: '#00ff00', // Adventure - Verde
      16: '#ffff00', // Animation - Amarillo
      35: '#ff00ff', // Comedy - Magenta
      80: '#000000', // Crime - Negro
      18: '#0000ff', // Drama - Azul
      27: '#8b0000', // Horror - Rojo oscuro
      878: '#00ffff', // Sci-Fi - Cyan
    }

    const primaryGenre = movie?.genre_ids?.[0]
    return genreColors[primaryGenre] || '#0f0f0f'
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15

      // Animación suave de escala
      const targetScale = hoveredMovie ? 3 : 2.5
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }

    // Animación suave de color
    if (materialRef.current) {
      const targetColor = new THREE.Color(getColorFromMovie(hoveredMovie))
      materialRef.current.color.lerp(targetColor, 0.1)
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#0f0f0f"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  )
}

interface ThreeHeroEnhancedProps {
  movies: TMDBMovie[]
  hoveredMovie: TMDBMovie | null
}

export function ThreeHeroEnhanced({ movies, hoveredMovie }: ThreeHeroEnhancedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight}px`
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere hoveredMovie={hoveredMovie} />
          {movies.length > 0 && <FloatingThumbnails movies={movies} hoveredMovie={hoveredMovie} />}
          <Environment preset="night" />
          <EffectComposer>
            <Bloom intensity={0.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.001, 0.001)}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
