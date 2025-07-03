import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./app/test/setupTests.ts'],
    alias: {
      '~': '/app',
      '@': '/app',
    },
  },
}); 