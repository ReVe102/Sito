import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    open: true, 
    fs: {
      allow: [
        path.resolve(__dirname, '../node_modules'),
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src')
      ]
    }
  },
});
