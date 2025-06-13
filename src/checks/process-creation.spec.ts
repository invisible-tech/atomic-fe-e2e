import { expect, test } from '@playwright/test'

test('Process creation works', async ({ browser }) => {
  const sessionCookie = process.env.E2E_ADMIN_COOKIE;
  if (!sessionCookie) {
    throw new Error('E2E_ADMIN_COOKIE environment variable is not set');
  }

  const context = await browser.newContext();
  await context.addCookies([
    {
      name: '__Secure-next-auth.session-token',
      value: sessionCookie,
      domain: '.inv.tech',
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year from now
    }
  ]);

  // Create page and navigate
  const page = await context.newPage();
  await page.goto('https://atomic.inv.tech/');

  // Verify authentication worked
  await expect(page.getByRole('heading', { name: 'Processes' })).toBeVisible();

  // Continue with your test...
  await page.getByText('Start new').click();
  await page.getByText('Start building').click();
  
  await page.waitForTimeout(5000);
  
  await expect(page.locator('p:has-text("streamline and automate")')).toBeVisible();
  
  // Don't forget to close context at the end
  await context.close();
})