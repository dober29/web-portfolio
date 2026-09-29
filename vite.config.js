import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  publicDir: 'public',
  resolve: {
    alias: {
      '@common': path.resolve(import.meta.dirname, './src'),
    },
  },
  plugins: [react()],
});
