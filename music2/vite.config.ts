import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Ensures relative asset paths for Netlify
  envDir: './', // Adjust path as needed
  preview: {
    allowedHosts: true,
    port: 3000,
    host: true,
  },
  server: {
    allowedHosts: true,
    port: 3000,
    host: true,
  },
});
