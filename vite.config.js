import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow access from network and ngrok
    port: 5173, // Vite dev server port
    allowedHosts: ['.ngrok-free.dev'], // allow all ngrok-free.dev URLs
  },
})