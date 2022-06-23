import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.*', 'tests/**/*.{e2e-spec,test,spec}.*'],
    reporters: ['default'],
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
