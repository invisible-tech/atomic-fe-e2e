import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60 * 1000,
  use: {
    navigationTimeout: 60 * 1000,
    actionTimeout: 60 * 1000,
    headless: true, 
  },
});
