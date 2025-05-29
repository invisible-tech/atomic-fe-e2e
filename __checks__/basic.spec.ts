import { test, expect } from '@playwright/test'

test('Homepage loads and displays expected content', async ({ page }) => {
  const baseUrl = process.env.ENVIRONMENT_URL

  if (!baseUrl) {
    throw new Error('ENVIRONMENT_URL is not defined in .env')
  }

  await page.goto(baseUrl)

  const title = await page.title()
  expect(title.length).toBeGreaterThan(0)
})
