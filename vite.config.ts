import { 
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
 } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

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
    ]
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      path: 'path-browserify',
    }
  },
  // ssr: {
  //   target: 'webworker',
  //   format: 'esm',
  //   noExternal: true
  // },
  build: {
    rollupOptions: {
      // external: [], // Explicitly mark nothing as external for the client build
      output: {
        manualChunks: {
          vendor: [
            '@remix-run/react',
            'react',
            'react-dom',
            'framer-motion'
          ]
        }
      }
    }
  },
  server: {
    hmr: {
      timeout: 5000
    }
  }
});
