/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: ["resend"],
  // Enable environment variable loading
  serverEnv: {
    RESEND_API_KEY: true
  },
  // MDX configuration
  mdx: async (filename) => {
    const [remarkGfm, rehypeSlug, rehypeAutolinkHeadings] = await Promise.all([
      import('remark-gfm').then((mod) => mod.default),
      import('rehype-slug').then((mod) => mod.default),
      import('rehype-autolink-headings').then((mod) => mod.default),
    ]);

    return {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }]
      ]
    };
  }
};
