import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Dev em / ; produção GitHub Pages em /Sully_Tech-website/
  base: command === 'build' ? '/Sully_Tech-website/' : '/',
}))
