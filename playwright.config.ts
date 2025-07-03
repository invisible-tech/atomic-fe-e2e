import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 90 * 1000,
  testDir: 'src/checks',
  use: {
    baseURL: 'https://atomic.inv.tech/',
    navigationTimeout: 90 * 1000,
    actionTimeout: 90 * 1000,
    headless: true, 
  },
});
