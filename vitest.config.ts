import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.*', 'tests/**/*.{spec,test,e2e-spec}.*'],
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
    },
    environment: 'happy-dom',
  },
});
