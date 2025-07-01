interface FilmMetaProps {
  director: string
  year: number
  runtime: string
  country: string
}

export function FilmMeta({ director, year, runtime, country }: FilmMetaProps) {
  return (
    <div className="bg-muted rounded-lg p-6 mb-8">
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <dt className="text-sm text-muted-foreground">Director</dt>
          <dd className="font-semibold">{director}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Año</dt>
          <dd className="font-semibold">{year}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Duración</dt>
          <dd className="font-semibold">{runtime}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">País</dt>
          <dd className="font-semibold">{country}</dd>
        </div>
      </dl>
    </div>
  )
}