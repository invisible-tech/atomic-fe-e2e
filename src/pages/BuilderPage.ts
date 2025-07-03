import { BasePage } from './BasePage';
import { Page } from '@playwright/test';
import { builderLocators } from '../locators/builderLocators';

export class BuilderPage extends BasePage {
  constructor(page: Page) {
	super(page);
  }

  async enterPrompt(prompt: string) {
	await this.input(builderLocators.promptTextarea, prompt);
  }

  async sendMessage() {
	await this.click(builderLocators.sendButton);
  }

  async waitForAcceptButton(timeout = 40000) {
	await this.waitFor(builderLocators.acceptButton, timeout);
  }

  async getStageTitles(): Promise<string[]> {
	return await this.getTextArray(builderLocators.stageTitles);
  }
}