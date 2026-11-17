import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative base path ensures smooth hosting on GitHub Pages and custom domains
  server: {
    port: 5173,
    host: true
  }
})
