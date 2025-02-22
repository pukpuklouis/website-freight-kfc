import { 
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
 } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
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
      '@radix-ui/react-alert-dialog'
    ],
    include: [
      '@remix-run/react',
      'react',
      'react-dom',
      'react/jsx-runtime'
    ],
    esbuildOptions: {
      target: 'es2020',
      platform: 'browser',
      jsx: 'automatic',
      format: 'esm',
    }
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      util: 'util',
      path: 'path-browserify',
      process: 'process/browser'
    }
  },
  build: {
    rollupOptions: {
      external: ['esbuild'],
      output: {
        manualChunks: {
          mdx: ['mdx-bundler', 'remark-gfm', 'remark-breaks', 'rehype-slug', 'rehype-autolink-headings']
        }
      }
    },
    commonjsOptions: {
      include: [/mdx-bundler/, /node_modules/],
      transformMixedEsModules: true
    }
  },
  server: {
    hmr: {
      timeout: 5000
    }
  }
});
