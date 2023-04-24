import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { IconPlugin } from './plugins/icons'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), IconPlugin()],
  base: '/vue-icons/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
