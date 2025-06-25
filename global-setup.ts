import { chromium, FullConfig } from '@playwright/test';
import * as twoFactor from './src/scripts/2fa';
import fs from 'fs';

async function globalSetup(config: FullConfig) {
  const baseUrl = process.env.BASE_URL || 'https://atomic.inv.tech/';
  const userName = process.env.E2E_ADMIN_EMAIL || 'qa-agent-admin@invisible.email';
  const password = process.env.E2E_ADMIN_PASSWORD || '';

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: 'Sign in with Auth0' }).click();
    await page.getByRole('button', { name: 'Continue with Google' }).click();
    await page.getByRole('textbox', { name: 'Email or phone' }).fill(userName);
    await page.getByRole('button', { name: 'Next' }).click();

    await page.getByRole('textbox', { name: 'Enter your password' }).fill(password);
    await page.getByRole('button', { name: 'Next' }).click();

    const code = twoFactor.get_two_factor();
    await page.waitForTimeout(8000);
    await page.getByRole('textbox', { name: 'Enter code' }).fill(code);
    await page.getByRole('textbox', { name: 'Enter code' }).press('Enter');

    await page.waitForTimeout(5000);
    await page.waitForSelector('h1, h2, h3, h4');

    // ✅ Save storage state
    await context.storageState({ path: './.auth/user.json' });
    console.log('✅ Authenticated context saved.');

  } catch (error) {
    console.error('❌ Authentication failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;