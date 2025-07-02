import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    film: { type: 'string', required: true },
    director: { type: 'string', required: true },
    year: { type: 'number', required: true },
    rating: { type: 'number', required: true },
    publishedAt: { type: 'date', required: true },
    slug: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    cover: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/films/${post.slug}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content/posts',
  documentTypes: [Post],
})
