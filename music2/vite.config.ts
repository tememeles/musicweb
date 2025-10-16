import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Ensures relative asset paths for Netlify
  preview: {
    allowedHosts: ['music.andasy.dev']
    
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 👈 Your Express backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
