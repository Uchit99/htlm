import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // The project is hosted from https://uchit99.github.io/htlm/ on GitHub Pages.
  base: '/htlm/',
  plugins: [react()],
})
