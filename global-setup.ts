import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from './src/pages/LoginPage';
import fs from 'fs';
import path from 'path';

async function globalSetup(config: FullConfig) {
  const baseUrl = process.env.BASE_URL || 'https://atomic.inv.tech/';
  const userName = process.env.E2E_ADMIN_EMAIL || 'qa-agent-admin@invisible.email';
  const password = process.env.E2E_ADMIN_PASSWORD || '';

  // Ensure auth directory exists
  const authDir = path.join(__dirname, '.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  try {
  await loginPage.navigateToLogin(baseUrl);
  await loginPage.performFullLogin(userName, password);
  
  await page.goto(baseUrl + 'dashboard', { waitUntil: 'networkidle' });
  
  await page.getByRole('heading', { name: 'Processes' }).waitFor({ timeout: 30000 });
  
  await context.storageState({ path: './.auth/user.json' });
  console.log('✅ Authenticated context saved.');

  } catch (error) {
    console.error('❌ Authentication failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;