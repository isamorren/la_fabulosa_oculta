 'use client'

  import dynamic from 'next/dynamic'
  import { Suspense, useEffect, useState } from 'react'
  import { allPosts } from '../../.contentlayer/generated'
  import { compareDesc } from 'date-fns'
  import { FilmCard } from '@/components/film-card'
  import { Hero } from '@/components/hero'

  const ThreeHero = dynamic(() => import('@/components/three-hero').then(mod => ({ default:
  mod.ThreeHero })), {
    ssr: false,
    loading: () => null,
  })

  export default function Home() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    const posts = allPosts
      .sort((a: any, b: any) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
      .slice(0, 6)

    const featuredPost = posts.find((post: any) => post.featured) || posts[0]

    return (
      <>
        {mounted && (
          <Suspense fallback={null}>
            <ThreeHero />
          </Suspense>
        )}

        <div className="relative z-10">
          <Hero featuredPost={featuredPost} />

          <main className="container mx-auto px-4 py-16">
            <section>
              <h2 className="text-3xl font-bold mb-8">Últimas críticas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any, index: number) => (
                  <FilmCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </>
    )
  }