import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the build works both at grotkoaleksandra.github.io/tarocik/
  // and later at the root of the tarocik domain.
  base: './',
  plugins: [react()],
  server: { port: 5174 },
})
