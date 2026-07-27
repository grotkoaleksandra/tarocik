import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Absolute base: the site lives at the root of tarocik.com (the old
  // github.io/tarocik URL redirects there), and subpath routes like
  // /rozklady need absolute asset URLs.
  base: '/',
  plugins: [react()],
  server: { port: 5174 },
})
