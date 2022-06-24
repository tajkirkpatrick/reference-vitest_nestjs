import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: 'tests/setup.ts',
    include: ['src/**/*.{test,spec}.*', 'tests/**/*.{e2e-spec,test,spec}.*'],
    reporters: ['default'],
    environment: 'happy-dom',
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
