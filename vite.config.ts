import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@svgr/rollup';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
        '@': '/src'
    },
  },
  define: {
    'process.env': {
      'SERVER_URL': 'http://localhost:8080'
    }
  },
})
