import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    minify: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material', '@mui/x-data-grid'],
  },
})