import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/utils/__tests__/**/*.test.ts'],
  },
});
