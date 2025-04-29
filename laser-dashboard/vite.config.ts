import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),          // keeps React fast-refresh
    tailwindcss(),    // lets Tailwind v4 work without extra PostCSS cfg
  ],
});

