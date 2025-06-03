import { expect, test } from '@playwright/test'

test('Homepage is reachable and responds with 200', async ({ page }) => {
  const baseUrl = "https://atomic.invsta.systems"
  if (!baseUrl) throw new Error('ENVIRONMENT_URL is not defined in .env')

  const response = await page.goto(baseUrl)
  expect(response).not.toBeNull()

  if (response) {
    expect(response.status()).toBeLessThanOrEqual(200)
  }
})
