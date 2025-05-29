// src/checks/google-login.spec.ts

import { test, expect } from '@playwright/test'

test('Google login flow works', async ({ page }) => {
  const loginName = process.env.GOOGLE_USER
  const loginPswd = process.env.GOOGLE_PWD
  const baseUrl = process.env.ENVIRONMENT_URL

  if (!loginName || !loginPswd || !baseUrl) {
    throw new Error('Missing one or more required environment variables: GOOGLE_USER, GOOGLE_PWD, ENVIRONMENT_URL')
  }

  await page.goto(`${baseUrl}/login`)

  await page.getByRole('button', { name: /login/i }).click()
  await page.getByRole('button', { name: /continue with google/i }).click()

  await page.locator('[type="email"]').fill(loginName)
  await page.getByRole('button', { name: /next/i }).click()

  await page.locator('[type="password"]').fill(loginPswd)
  await page.getByRole('button', { name: /next/i }).click()

  await page.waitForURL('**/dashboard', { timeout: 15000 })
})
