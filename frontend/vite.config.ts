import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // tell vite to resolve absolute paths
  resolve: {
    alias: {
      '@': '/src'
    }
  }
  // end
})
