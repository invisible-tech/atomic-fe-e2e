import { BasePage } from './basePage';
import { Page } from '@playwright/test';
import { loginLocators } from '../locators/loginLocators';
import * as twoFactor from '../utils/2fa';

export class LoginPage extends BasePage {
  constructor(page: Page) {
	super(page);
  }

  async navigateToLogin(baseUrl: string) {
	await this.navigate(baseUrl, { waitUntil: 'networkidle' });
  }

  async clickSignInWithAuth0() {
	await this.click(loginLocators.signInWithAuth0Button);
  }

  async clickContinueWithGoogle() {
	await this.click(loginLocators.continueWithGoogleButton);
  }

  async enterEmail(email: string) {
	// Try both possible email input selectors
	try {
	  await this.input(loginLocators.emailOrPhoneInput, email);
	} catch {
	  await this.input(loginLocators.emailInput, email);
	}
  }

  async enterPassword(password: string) {
	// Try both possible password input selectors
	try {
	  await this.input(loginLocators.enterPasswordInput, password);
	} catch {
	  await this.input(loginLocators.passwordInput, password);
	}
  }

  async clickNext() {
	await this.click(loginLocators.nextButton);
  }

  async enter2FACode() {
	const code = twoFactor.get_two_factor();
	await this.page.waitForTimeout(8000); // Wait for 2FA prompt
	await this.input(loginLocators.twoFactorCodeInput, code);
	await this.page.locator(loginLocators.twoFactorCodeInput).press('Enter');
  }

  async waitForLoginSuccess() {
	await this.page.waitForTimeout(5000);
	await this.waitFor(loginLocators.pageHeadings);
  }

  async performFullLogin(email: string, password: string) {
	await this.clickSignInWithAuth0();
	await this.clickContinueWithGoogle();
	await this.enterEmail(email);
	await this.clickNext();
	await this.enterPassword(password);
	await this.clickNext();
	await this.enter2FACode();
	await this.waitForLoginSuccess();
  }
}