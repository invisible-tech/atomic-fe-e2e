import { test as base, expect } from '@playwright/test'
import * as twoFactor from '../scripts/2fa'

export const test = base.extend<{
  authenticatedPage: import('@playwright/test').Page
}>({
  authenticatedPage: async ({ browser }, use) => {
    const baseUrl = process.env.BASE_URL || "https://atomic.inv.tech/"
    const userName = process.env.E2E_ADMIN_EMAIL
    const password = process.env.E2E_ADMIN_PASSWORD
    
    const context = await browser.newContext()
    const page = await context.newPage()
    
    try {
      console.log('Starting authentication flow...')
      
      await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 })
      
      await page.waitForSelector('button:has-text("Sign in with Auth0")', { timeout: 10000 })
      await page.getByRole('button', { name: 'Sign in with Auth0' }).click()
      
      await page.waitForSelector('button:has-text("Continue with Google")', { timeout: 10000 })
      await page.getByRole('button', { name: 'Continue with Google' }).click()
      
      await page.waitForSelector('input[type="email"], input[name="identifier"]', { timeout: 10000 })
      await page.getByRole('textbox', { name: 'Email or phone' }).click()
      await page.getByRole('textbox', { name: 'Email or phone' }).fill(userName)
      await page.getByRole('button', { name: 'Next' }).click()
      
      await page.waitForSelector('input[type="password"]', { timeout: 10000 })
      await page.getByRole('textbox', { name: 'Enter your password' }).click()
      await page.getByRole('textbox', { name: 'Enter your password' }).fill(password)
      await page.getByRole('button', { name: 'Next' }).click()
      
      const code = twoFactor.get_two_factor()
      console.log(`Generated 2FA code: ${code.substring(0, 3)}***`)
      
      await page.waitForTimeout(8000)
      
      await page.waitForSelector('input[type="tel"], input[type="text"][autocomplete="one-time-code"]', { timeout: 15000 })
      await page.getByRole('textbox', { name: 'Enter code' }).click()
      await page.getByRole('textbox', { name: 'Enter code' }).fill(code)
      await page.getByRole('textbox', { name: 'Enter code' }).press('Enter')
      
      await page.waitForTimeout(5000)
      
      await expect(page.getByRole('heading', { name: 'Processes' })).toBeVisible({ timeout: 10000 })
      console.log('Authentication successful!')
      
      await use(page)
      
    } catch (error) {
      console.error('Authentication failed:', error)
      throw error
    } finally {
      await context.close()
    }
  },
})

export { expect }