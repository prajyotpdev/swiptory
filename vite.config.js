import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills()],
    base : "/swiptory/",  
    define: {
      __APP_ENV__: process.env.VITE_VERCEL_ENV,
    },
})
