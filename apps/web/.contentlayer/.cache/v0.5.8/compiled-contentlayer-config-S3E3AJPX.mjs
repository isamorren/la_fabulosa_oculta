// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    film: { type: "string", required: true },
    director: { type: "string", required: true },
    year: { type: "number", required: true },
    rating: { type: "number", required: true },
    publishedAt: { type: "date", required: true },
    slug: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    cover: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    featured: { type: "boolean", default: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/films/${post.slug}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content/posts",
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-S3E3AJPX.mjs.map
