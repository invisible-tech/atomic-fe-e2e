import { expect, test } from '@playwright/test'
import * as twoFactor from '../scripts/2fa'

test('Google authentication works', async ({ page }) => {
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
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(pw);
  await page.getByRole('button', { name: 'Next' }).click();
  
  const code = twoFactor.get_two_factor();
  await page.waitForTimeout(8000);
   
  await page.getByRole('textbox', { name: 'Enter code' }).click();
  
  await page.getByRole('textbox', { name: 'Enter code' }).fill(code);
  await page.getByRole('textbox', { name: 'Enter code' }).press('Enter');
  
  await page.waitForTimeout(5000);
      
  await expect(page.getByRole('heading', { name: 'Processes' })).toBeVisible();
})
