import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import { SEO, FilmReviewJsonLd } from '@/lib/seo'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { Star } from 'lucide-react'

interface FilmPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: FilmPageProps): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Filmverse'],
      tags: post.tags,
    },
  }
}

export default function FilmPage({ params }: FilmPageProps) {
  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const MDXContent = useMDXComponent(post.body.code)

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/films/${post.slug}`}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: post.publishedAt,
            tags: post.tags,
          },
          images: post.cover ? [{ url: post.cover }] : undefined,
        }}
      />
      <FilmReviewJsonLd
        title={post.title}
        description={post.excerpt}
        authorName="Filmverse"
        publishedDate={post.publishedAt}
        images={post.cover ? [post.cover] : []}
        filmTitle={post.film}
        director={post.director}
        rating={post.rating}
        slug={post.slug}
      />

      <article className="container mx-auto max-w-4xl px-4 py-16">
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>

          <div className="text-muted-foreground mb-6 flex items-center gap-6">
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), "d 'de' MMMM, yyyy", { locale: es })}
            </time>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < post.rating ? 'fill-current text-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-secondary rounded-full px-3 py-1 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXContent />
        </div>
      </article>
    </>
  )
}
