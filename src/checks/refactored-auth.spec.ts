import { test, expect } from '@playwright/test';

test('Processes page is visible when logged in', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'Processes' })).toBeVisible();
});