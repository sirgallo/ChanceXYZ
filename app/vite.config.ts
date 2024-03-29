import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill';
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@app': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@models': fileURLToPath(new URL('./src/models', import.meta.url)),
      '@providers': fileURLToPath(new URL('./src/providers', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url))
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        NodeModulesPolyfills(),
        GlobalsPolyfills({
          buffer: true,
          process: true
        })
      ]
    }
  }
});