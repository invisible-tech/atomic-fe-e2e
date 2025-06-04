import { expect, test } from '@playwright/test'

test('Homepage and LLM validation', async ({ page, request }) => {
  const baseUrl = 'https://atomic.invsta.systems'
  const llmCheckUrl = 'https://script.google.com/macros/s/AKfycbyU1ev45sxhYSgNxdxSrkZvt3Su1bvbxL55xoXtZQ5OhZxsecBL56ELuNPeDaCgNyx07g/exec'

  const response = await page.goto(baseUrl)
  expect(response).not.toBeNull()
  if (response) {
    expect(response.status()).toBeLessThanOrEqual(200)
  }

  const payload = {
    instructions: "Check if the shutdown process includes safe power-off, lockout, and warning signs.",
    prompt: "Describe how to safely shut down the machine.",
    llm_response: (
      "1. Press the emergency stop button to halt machine operations.\n"
      + "2. Turn off and disconnect the main power supply.\n"
      + "3. Apply a lockout/tagout device to the main breaker.\n"
      + "4. Place warning signage indicating maintenance in progress."
    )
  }

  const llmResponse = await request.post(llmCheckUrl, {
    data: payload,
    headers: { 'Content-Type': 'application/json' }
  })

  expect(llmResponse.status()).toBe(200)

  const llmJson = await llmResponse.json()
  expect(llmJson.result).toBe(true)
})
