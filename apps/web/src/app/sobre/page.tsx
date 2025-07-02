import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Film, Heart, Sparkles, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description: 'La historia detrás de FilmVerse y nuestra pasión por el cine',
}

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Sobre La Fabulosa Oculta"
        description="Una plataforma dedicada al análisis profundo del séptimo arte"
      />

      <section className="container mx-auto max-w-4xl px-6 py-12">
        <div className="prose prose-invert prose-lg mx-auto">
          <p className="lead mb-8 text-xl text-gray-300">
            La Fabulosa Oculta nace de la pasión por el cine y el deseo de crear un espacio donde el
            análisis cinematográfico se encuentra con el diseño digital de vanguardia.
          </p>

          <div className="my-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-card border-border rounded-lg border p-6">
              <Film className="mb-4 h-12 w-12 text-blue-500" />
              <h3 className="mb-2 text-xl font-bold">Nuestra Misión</h3>
              <p className="text-gray-400">
                Ofrecer análisis cinematográficos profundos que vayan más allá de las reseñas
                convencionales, explorando el arte detrás de cada frame.
              </p>
            </div>

            <div className="bg-card border-border rounded-lg border p-6">
              <Heart className="mb-4 h-12 w-12 text-red-500" />
              <h3 className="mb-2 text-xl font-bold">Nuestra Pasión</h3>
              <p className="text-gray-400">
                El cine como forma de arte, como ventana a otras realidades y como catalizador de
                emociones y reflexiones profundas.
              </p>
            </div>

            <div className="bg-card border-border rounded-lg border p-6">
              <Sparkles className="mb-4 h-12 w-12 text-yellow-500" />
              <h3 className="mb-2 text-xl font-bold">Nuestro Enfoque</h3>
              <p className="text-gray-400">
                Combinamos análisis riguroso con una experiencia visual inmersiva, creando un
                espacio único para los amantes del cine.
              </p>
            </div>

            <div className="bg-card border-border rounded-lg border p-6">
              <Users className="mb-4 h-12 w-12 text-green-500" />
              <h3 className="mb-2 text-xl font-bold">Nuestra Comunidad</h3>
              <p className="text-gray-400">
                Un lugar de encuentro para cinéfilos, críticos y creadores que comparten el amor por
                las historias bien contadas.
              </p>
            </div>
          </div>

          <h2 className="mb-6 mt-12 text-3xl font-bold">El Equipo</h2>
          <p className="mb-8 text-gray-300">
            La Fabulosa Oculta es mantenida por un equipo de apasionados del cine y desarrolladores
            creativos que creen en la intersección entre tecnología y arte cinematográfico.
          </p>

          <h2 className="mb-6 mt-12 text-3xl font-bold">Contacto</h2>
          <p className="text-gray-300">
            ¿Tienes sugerencias, colaboraciones o simplemente quieres hablar de cine? Escríbenos a{' '}
            <a
              href="mailto:hola@lafabulosaoculta.com"
              className="text-blue-400 hover:text-blue-300"
            >
              hola@lafabulosaoculta.com
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
