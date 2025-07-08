'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Camera,
  Film,
  Palette,
  Music,
  MessageSquare,
  ChevronRight,
  Clock,
  Eye,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface SceneAnalysis {
  id: string
  movie: {
    title: string
    year: number
    director: string
  }
  scene: {
    title: string
    duration: string
    timestamp: string
    thumbnail: string
    videoUrl?: string
  }
  analysis: {
    cinematography: string
    colorGrading: string
    soundDesign: string
    narrative: string
    symbolism: string
  }
  technicalDetails: {
    camera: string
    lens: string
    lighting: string
    aspectRatio: string
  }
  behindTheScenes: string
  culturalImpact: string
  relatedScenes: Array<{
    id: string
    title: string
    movie: string
    thumbnail: string
  }>
}

const iconicScenes: SceneAnalysis[] = [
  {
    id: 'blade-runner-tears',
    movie: {
      title: 'Blade Runner',
      year: 1982,
      director: 'Ridley Scott',
    },
    scene: {
      title: 'Lágrimas en la lluvia',
      duration: '3:42',
      timestamp: '1:47:23',
      thumbnail: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    },
    analysis: {
      cinematography:
        'La lluvia y la iluminación crean una atmósfera melancólica perfecta. El contraste entre la oscuridad y los destellos de luz simboliza la dualidad vida/muerte.',
      colorGrading:
        'Paleta fría dominada por azules y grises, con toques cálidos en la piel de los personajes que humaniza a Roy en sus últimos momentos.',
      soundDesign:
        'La música de Vangelis se fusiona con el sonido de la lluvia, creando una sinfonía emotiva que eleva el monólogo a niveles trascendentales.',
      narrative:
        'El monólogo improvisado de Rutger Hauer transforma una escena de acción en una reflexión filosófica sobre la mortalidad y el significado de la vida.',
      symbolism:
        'La paloma blanca representa el alma de Roy ascendiendo, mientras que la lluvia lava simbólicamente sus pecados.',
    },
    technicalDetails: {
      camera: 'Panavision PSR',
      lens: 'Anamórfico 35mm',
      lighting: 'Iluminación práctica con neón y reflectores',
      aspectRatio: '2.35:1',
    },
    behindTheScenes:
      'Rutger Hauer improvisó gran parte del monólogo final, reduciendo el texto original y añadiendo la icónica línea "como lágrimas en la lluvia".',
    culturalImpact:
      'Considerada una de las escenas más influyentes del cine de ciencia ficción, ha sido homenajeada y parodiada en innumerables obras.',
    relatedScenes: [
      {
        id: '2001-stargate',
        title: 'Secuencia Stargate',
        movie: '2001: A Space Odyssey',
        thumbnail: '/ve72VxNqjGM69Uky4WTo2bK6rfq.jpg',
      },
      {
        id: 'matrix-red-pill',
        title: 'Píldora roja o azul',
        movie: 'The Matrix',
        thumbnail: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      },
    ],
  },
  {
    id: 'in-mood-alley',
    movie: {
      title: 'In the Mood for Love',
      year: 2000,
      director: 'Wong Kar-wai',
    },
    scene: {
      title: 'Encuentro en el callejón',
      duration: '2:15',
      timestamp: '0:32:45',
      thumbnail: '/iYypPT4bhqXfq1b6EnmxvRt6b2Y.jpg',
    },
    analysis: {
      cinematography:
        'Cámara lenta hipnótica que convierte un momento cotidiano en poesía visual. Los encuadres a través de marcos y objetos sugieren las barreras emocionales.',
      colorGrading:
        'Rojos saturados y verdes profundos crean una paleta nostálgica que evoca los recuerdos y el deseo reprimido.',
      soundDesign:
        'El tema de Shigeru Umebayashi se convierte en el latido emocional de la película, marcando cada encuentro con melancolía.',
      narrative:
        'Sin diálogos, la escena comunica volúmenes sobre el deseo no correspondido a través de gestos mínimos y miradas fugaces.',
      symbolism:
        'El humo del cigarrillo y el vapor de los fideos representan lo efímero de los encuentros y la naturaleza elusiva del amor.',
    },
    technicalDetails: {
      camera: 'Arriflex 35',
      lens: 'Zeiss Ultra Prime',
      lighting: 'Luz natural filtrada y tungsteno',
      aspectRatio: '1.66:1',
    },
    behindTheScenes:
      'Wong Kar-wai filmó la escena múltiples veces durante varios días para capturar la luz perfecta del atardecer.',
    culturalImpact:
      'Definió una nueva estética en el cine asiático y mundial, influenciando a directores como Sofia Coppola y Paul Thomas Anderson.',
    relatedScenes: [
      {
        id: 'lost-translation-window',
        title: 'Mirada por la ventana',
        movie: 'Lost in Translation',
        thumbnail: '/wkSzJs7oMf8MIr9CQVICsvRfwA7.jpg',
      },
    ],
  },
]

export function IconicScenes() {
  const [selectedScene, setSelectedScene] = useState<SceneAnalysis | null>(null)
  const [activeTab, setActiveTab] = useState<'cinematography' | 'color' | 'sound' | 'narrative'>(
    'cinematography'
  )
  const [isPlaying, setIsPlaying] = useState(false)

  const tabConfig = {
    cinematography: { label: 'Cinematografía', icon: Camera },
    color: { label: 'Color', icon: Palette },
    sound: { label: 'Sonido', icon: Music },
    narrative: { label: 'Narrativa', icon: MessageSquare },
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="mb-4 flex items-center gap-3 text-4xl font-bold md:text-5xl">
            <Film className="h-10 w-10" />
            Análisis de Escenas Icónicas
          </h1>
          <p className="max-w-3xl text-xl text-gray-400">
            Desglosamos los momentos que han definido el cine, explorando cada elemento técnico y
            artístico que los convierte en obras maestras.
          </p>
        </motion.div>

        {/* Scenes Grid */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          {iconicScenes.map((scene, index) => (
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
              onClick={() => setSelectedScene(scene)}
            >
              <div className="relative overflow-hidden rounded-xl bg-black">
                {/* Thumbnail */}
                <div className="relative aspect-video">
                  <Image
                    src={`https://image.tmdb.org/t/p/w1280${scene.scene.thumbnail}`}
                    alt={scene.scene.title}
                    fill
                    className="object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                      <Play className="ml-1 h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute right-4 top-4 rounded-full bg-black/60 px-3 py-1 text-sm backdrop-blur-sm">
                    {scene.scene.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="mb-2 text-2xl font-bold">{scene.scene.title}</h3>
                  <p className="mb-1 text-gray-300">
                    {scene.movie.title} ({scene.movie.year})
                  </p>
                  <p className="text-sm text-gray-400">Dirigida por {scene.movie.director}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Scenes */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-2xl font-bold">Más escenas para analizar</h2>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[
              { title: 'Secuencia de apertura', movie: 'There Will Be Blood', year: 2007 },
              { title: 'Paseo en moto', movie: 'The Place Beyond the Pines', year: 2012 },
              {
                title: 'Última cena',
                movie: 'The Cook, the Thief, His Wife & Her Lover',
                year: 1989,
              },
              { title: 'Baile final', movie: 'Beau Travail', year: 1999 },
              { title: 'Persecución', movie: 'The French Connection', year: 1971 },
              { title: 'Monólogo del espejo', movie: 'Taxi Driver', year: 1976 },
              { title: 'Secuencia del ascensor', movie: 'Drive', year: 2011 },
              { title: 'Final en la playa', movie: 'The 400 Blows', year: 1959 },
            ].map((scene, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group cursor-pointer rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10"
              >
                <h4 className="mb-1 font-semibold transition-colors group-hover:text-white">
                  {scene.title}
                </h4>
                <p className="text-sm text-gray-400">
                  {scene.movie} ({scene.year})
                </p>
                <ChevronRight className="mt-2 h-4 w-4 text-gray-500 transition-all group-hover:translate-x-1 group-hover:text-white" />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Scene Analysis Modal */}
      <AnimatePresence>
        {selectedScene && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-sm"
          >
            <div className="min-h-screen px-6 py-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="mx-auto max-w-6xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedScene(null)}
                  className="absolute right-6 top-6 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Video Player */}
                <div className="relative mb-8 aspect-video overflow-hidden rounded-xl bg-black">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${selectedScene.scene.thumbnail}`}
                    alt={selectedScene.scene.title}
                    fill
                    className="object-cover"
                  />

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30"
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                        <span className="text-sm">
                          {selectedScene.scene.timestamp} / {selectedScene.scene.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="rounded p-2 transition-colors hover:bg-white/20">
                          <Volume2 className="h-5 w-5" />
                        </button>
                        <button className="rounded p-2 transition-colors hover:bg-white/20">
                          <Maximize className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="h-1 rounded-full bg-white/20">
                      <div className="h-full w-1/3 rounded-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* Scene Info */}
                <div className="mb-8">
                  <h2 className="mb-2 text-4xl font-bold">{selectedScene.scene.title}</h2>
                  <p className="text-xl text-gray-300">
                    {selectedScene.movie.title} ({selectedScene.movie.year}) •{' '}
                    {selectedScene.movie.director}
                  </p>
                </div>

                {/* Analysis Tabs */}
                <div className="mb-8 flex gap-2 overflow-x-auto">
                  {(Object.keys(tabConfig) as Array<keyof typeof tabConfig>).map((tab) => {
                    const { label, icon: Icon } = tabConfig[tab]
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          'flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-all',
                          activeTab === tab
                            ? 'bg-white text-black'
                            : 'bg-white/10 hover:bg-white/20'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    )
                  })}
                </div>

                {/* Tab Content */}
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="space-y-8 lg:col-span-2">
                    {/* Main Analysis */}
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-white/5 p-6"
                    >
                      <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                        {React.createElement(tabConfig[activeTab].icon, { className: 'w-6 h-6' })}
                        {tabConfig[activeTab].label}
                      </h3>
                      <p className="text-lg leading-relaxed text-gray-300">
                        {activeTab === 'cinematography' && selectedScene.analysis.cinematography}
                        {activeTab === 'color' && selectedScene.analysis.colorGrading}
                        {activeTab === 'sound' && selectedScene.analysis.soundDesign}
                        {activeTab === 'narrative' && selectedScene.analysis.narrative}
                      </p>
                    </motion.div>

                    {/* Symbolism */}
                    <div className="rounded-xl bg-white/5 p-6">
                      <h3 className="mb-4 text-xl font-bold">Simbolismo y Significado</h3>
                      <p className="leading-relaxed text-gray-300">
                        {selectedScene.analysis.symbolism}
                      </p>
                    </div>

                    {/* Behind the Scenes */}
                    <div className="rounded-xl bg-white/5 p-6">
                      <h3 className="mb-4 text-xl font-bold">Detrás de cámaras</h3>
                      <p className="leading-relaxed text-gray-300">
                        {selectedScene.behindTheScenes}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Technical Details */}
                    <div className="rounded-xl bg-white/5 p-6">
                      <h3 className="mb-4 text-xl font-bold">Detalles Técnicos</h3>
                      <dl className="space-y-3">
                        <div>
                          <dt className="text-sm text-gray-400">Cámara</dt>
                          <dd className="font-medium">{selectedScene.technicalDetails.camera}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-400">Lentes</dt>
                          <dd className="font-medium">{selectedScene.technicalDetails.lens}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-400">Iluminación</dt>
                          <dd className="font-medium">{selectedScene.technicalDetails.lighting}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-400">Formato</dt>
                          <dd className="font-medium">
                            {selectedScene.technicalDetails.aspectRatio}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Cultural Impact */}
                    <div className="rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6">
                      <h3 className="mb-4 text-xl font-bold">Impacto Cultural</h3>
                      <p className="text-gray-300">{selectedScene.culturalImpact}</p>
                    </div>

                    {/* Related Scenes */}
                    {selectedScene.relatedScenes.length > 0 && (
                      <div>
                        <h3 className="mb-4 text-xl font-bold">Escenas Relacionadas</h3>
                        <div className="space-y-3">
                          {selectedScene.relatedScenes.map((related) => (
                            <div
                              key={related.id}
                              className="flex cursor-pointer gap-3 rounded-lg bg-white/5 p-3 transition-all hover:bg-white/10"
                            >
                              <div className="relative aspect-video w-20 flex-shrink-0 overflow-hidden rounded">
                                <Image
                                  src={`https://image.tmdb.org/t/p/w300${related.thumbnail}`}
                                  alt={related.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{related.title}</p>
                                <p className="text-xs text-gray-400">{related.movie}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
