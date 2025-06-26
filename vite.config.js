// vite.config.js
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist', // Firebase will deploy from here
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
  },
  base: './', // required for Firebase static hosting in subdirectories
});
