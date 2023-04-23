import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import macrosPlugin from "vite-plugin-babel-macros"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [macrosPlugin(), vue(), vueJsx()],
  base: '/vue-icons/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
