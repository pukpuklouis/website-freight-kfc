import { 
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
 } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from "@mdx-js/rollup";
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Change this line to accept the 'mode' argument
export default defineConfig(({ mode }) => { // <--- ADD ({ mode }) HERE
  const isProduction = mode === 'production'; // Create a boolean variable for clarity
  
  return {
  plugins: [
    remixCloudflareDevProxy(),
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }]
      ]
    }),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      }
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: [
      '@radix-ui/react-form',
      '@radix-ui/react-alert-dialog',
    ],
    include: [
      '@remix-run/react',
      'react',
      'react-dom',
      'react/jsx-runtime'
    ]
  },
  resolve: {
    //only alias when in production 
    alias: isProduction ? {
      crypto: 'crypto-browserify',
      path: 'path-browserify'
    } : {},
  },
  build: {
    sourcemap: false
  }
};
});

