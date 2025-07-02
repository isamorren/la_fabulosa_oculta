import { NextSeo, ArticleJsonLd } from 'next-seo'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    type?: string
    article?: {
      publishedTime?: string
      modifiedTime?: string
      authors?: string[]
      tags?: string[]
    }
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
  }
}

export function SEO({ title, description, canonical, openGraph }: SEOProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://filmverse.com'

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical ? `${siteUrl}${canonical}` : undefined}
      openGraph={{
        url: canonical ? `${siteUrl}${canonical}` : siteUrl,
        title,
        description,
        site_name: 'Filmverse',
        locale: 'es_ES',
        ...openGraph,
      }}
      twitter={{
        handle: '@filmverse',
        site: '@filmverse',
        cardType: 'summary_large_image',
      }}
    />
  )
}

interface FilmReviewJsonLdProps {
  title: string
  description: string
  authorName: string
  publishedDate: string
  modifiedDate?: string
  images: string[]
  filmTitle: string
  director: string
  rating: number
  slug: string
}

export function FilmReviewJsonLd({
  title,
  description,
  authorName,
  publishedDate,
  modifiedDate,
  images,
  filmTitle,
  director,
  rating,
  slug,
}: FilmReviewJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://filmverse.com'

  return (
    <>
      <ArticleJsonLd
        type="Article"
        url={`${siteUrl}/films/${slug}`}
        title={title}
        images={images}
        datePublished={publishedDate}
        dateModified={modifiedDate || publishedDate}
        authorName={[
          {
            name: authorName,
            url: `${siteUrl}/about`,
          },
        ]}
        publisherName="Filmverse"
        publisherLogo={`${siteUrl}/logo.png`}
        description={description}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Review',
            itemReviewed: {
              '@type': 'Movie',
              name: filmTitle,
              director: {
                '@type': 'Person',
                name: director,
              },
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: rating,
              bestRating: 5,
            },
            author: {
              '@type': 'Person',
              name: authorName,
            },
            datePublished: publishedDate,
            publisher: {
              '@type': 'Organization',
              name: 'Filmverse',
            },
          }),
        }}
      />
    </>
  )
}
