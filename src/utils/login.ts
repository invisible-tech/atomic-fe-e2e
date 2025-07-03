import { Page } from '@playwright/test';

export async function loginToAtomic(page: Page): Promise<void> {
  try {
    const baseUrl = 'https://atomic.inv.tech/';
    const userName = process.env.E2E_ADMIN_EMAIL || 'qa-agent-admin@invisible.email';
    const password = process.env.E2E_ADMIN_PASSWORD;
    
    if (!password) {
      throw new Error(
        `Missing E2E_ADMIN_PASSWORD environment variable.\n` +
        `Please set it via Checkly secrets or your .env file.`
      );
    }

    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: 'Sign in with Auth0' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill(userName);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await page.waitForSelector('h1, h2, h3, h4', { timeout: 10000 });
  } catch (error) {
    throw new Error(`Failed to log in to Atomic: ${error instanceof Error ? error.message : String(error)}`);
  }
}
