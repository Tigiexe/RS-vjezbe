import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // relativne putanje -> dist/ radi s bilo kojeg statičnog servera ili poddirektorija
  base: './',
  build: {
    outDir: 'dist',
  },
  preview: {
    port: 8080,
  },
})
