'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { TMDBMovie } from '@/lib/tmdb/types'
import { getPosterUrl } from '@/lib/tmdb/client'

interface FloatingThumbnailsProps {
  movies: TMDBMovie[]
  hoveredMovie: TMDBMovie | null
}

function FloatingPoster({
  movie,
  index,
  total,
  isHovered,
}: {
  movie: TMDBMovie
  index: number
  total: number
  isHovered: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const angle = (index / total) * Math.PI * 2
  const radius = 3

  // Cargar textura
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(getPosterUrl(movie.poster_path, 'small'), (loadedTexture) => {
      setTexture(loadedTexture)
    })
  }, [movie.poster_path])

  useFrame((state) => {
    if (!meshRef.current) return

    // Rotación orbital
    const time = state.clock.elapsedTime * 0.1
    const x = Math.cos(angle + time) * radius
    const z = Math.sin(angle + time) * radius
    const y = Math.sin(time + index) * 0.3

    meshRef.current.position.set(x, y, z)
    meshRef.current.lookAt(0, 0, 0)

    // Efecto de hover
    const targetScale = isHovered ? 1.2 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1.5]} />
      <meshStandardMaterial transparent opacity={isHovered ? 1 : 0.7} map={texture} />
    </mesh>
  )
}

export function FloatingThumbnails({ movies, hoveredMovie }: FloatingThumbnailsProps) {
  return (
    <group>
      {movies.slice(0, 6).map((movie, index) => (
        <FloatingPoster
          key={movie.id}
          movie={movie}
          index={index}
          total={6}
          isHovered={hoveredMovie?.id === movie.id}
        />
      ))}
    </group>
  )
}
