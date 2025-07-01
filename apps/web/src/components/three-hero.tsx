'use client'

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
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

export function ThreeHero() {
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
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <AnimatedSphere />
          <Environment preset="night" />
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
            />
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