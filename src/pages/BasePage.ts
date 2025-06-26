import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string, options?: { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' }) {
   const baseUrl = process.env.BASE_URL || 'https://atomic.inv.tech';
   const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
   await this.page.goto(url, options);
 }

  async click(locator: string | Locator) {
	const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
	await element.waitFor({ state: 'visible' });
	await element.click();
  }

  async input(locator: string | Locator, value: string) {
	const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
	await element.waitFor({ state: 'visible' });
	await element.fill(value);
  }

  async waitFor(locator: string | Locator, timeout = 10000) {
	const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
	await element.waitFor({ state: 'visible', timeout });
  }

  async getTextArray(locator: string | Locator): Promise<string[]> {
	const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
	return (await element.allInnerTexts()).map(t => t.trim());
  }
}