import { defineConfig } from 'vitest/config'
import viteReact from '@vitejs/plugin-react'
// import { tanstackRouter } from '@tanstack/router-plugin/vite'  // Disabled for code-based routing
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // tanstackRouter({  // Disabled for code-based routing
    //   target: 'react',
    //   autoCodeSplitting: true,
    // }), 
    viteReact()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
