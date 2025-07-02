interface FilmMetaProps {
  director: string
  year: number
  runtime: string
  country: string
}

export function FilmMeta({ director, year, runtime, country }: FilmMetaProps) {
  return (
    <div className="bg-muted mb-8 rounded-lg p-6">
      <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div>
          <dt className="text-muted-foreground text-sm">Director</dt>
          <dd className="font-semibold">{director}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-sm">Año</dt>
          <dd className="font-semibold">{year}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-sm">Duración</dt>
          <dd className="font-semibold">{runtime}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground text-sm">País</dt>
          <dd className="font-semibold">{country}</dd>
        </div>
      </dl>
    </div>
  )
}
