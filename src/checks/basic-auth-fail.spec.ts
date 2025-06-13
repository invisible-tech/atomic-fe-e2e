import { expect, test } from '@playwright/test'
import * as twoFactor from '../scripts/2fa'

test('Google authentication fails correctly', async ({ page }) => {
  const baseUrl = "https://atomic.inv.tech/"

  const userName = process.env.E2E_ADMIN_EMAIL;
  const pw = process.env.E2E_ADMIN_PASSWORD;
  
  const response = await page.goto(baseUrl)
  await page.getByRole('button', { name: 'Sign in with Auth0' }).click();
  await page.getByRole('button', { name: 'Continue with Google' }).click();
  await page.getByRole('textbox', { name: 'Email or phone' }).click();
  await page.getByRole('textbox', {name: 'Email or phone' }).fill(userName);
  await page.getByRole('button', { name: 'Next' }).click();
  
  await page.getByRole('textbox', { name: 'Enter your password' }).click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(pw + "xyz"); 
  await page.getByRole('button', { name: 'Next' }).click();
  
  await expect(page.getByText('Wrong password')).toBeVisible();
})
