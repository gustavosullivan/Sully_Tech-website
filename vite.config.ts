import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages (project site). Trocar para '/' quando sullytech.com.br tiver DNS.
  base: '/Sully_Tech-website/',
})
