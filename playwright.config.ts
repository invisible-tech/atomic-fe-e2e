import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60 * 1000,
  use: {
    baseURL: 'https://atomic.inv.tech/',
    storageState: './.auth/user.json',
    navigationTimeout: 60 * 1000,
    actionTimeout: 60 * 1000,
    headless: true, 
  },
  globalSetup: require.resolve('./global-setup.ts'),
});
