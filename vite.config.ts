import { 
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
 } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    mdx({
      remarkPlugins: [remarkGfm],
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
      // 'mdx-bundler' // Keep excluded
    ],
    include: [
      '@remix-run/react',
      'react',
      'react-dom',
      'react/jsx-runtime',
      'mdx-bundler'
    ]
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      // path: 'path-browserify'
    }
  },
  build: {
    sourcemap: false
    },
  server: {
    hmr: {
      timeout: 5000
    }
  }
});
