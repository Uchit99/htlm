import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.GITHUB_ACTIONS ? '/htlm/' : '/'

export default defineConfig({
  // GitHub Pages hosts this project under /htlm/, while Vercel uses the domain root.
  base,
  plugins: [react()],
})
