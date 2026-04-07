import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Devive-Manager/',
  build: {
    minify: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material', '@mui/x-data-grid'],
  },
})