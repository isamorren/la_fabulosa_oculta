'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'

interface MDXContentProps {
  code: string
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <Component />
    </div>
  )
}
