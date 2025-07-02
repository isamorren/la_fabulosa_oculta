import { PageHeader } from '@/components/page-header'

export default function DirectoresPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Directores"
        description="Los maestros del cine que han definido el lenguaje cinematográfico"
      />

      <section className="container mx-auto px-6 py-12">
        <div className="py-20 text-center">
          <p className="text-lg text-gray-400">
            Próximamente agregaremos perfiles de directores destacados.
          </p>
        </div>
      </section>
    </div>
  )
}
