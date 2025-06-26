import { BasePage } from './basePage';
import { Page } from '@playwright/test';
import { dashboardLocators } from '../locators/dashboardLocators';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
	super(page);
  }

  async open() {
	await this.navigate('/dashboard');
	await this.waitFor('h1:has-text("Processes")');
  }

  async clickStartNew() {
	await this.click(dashboardLocators.startNewButton);
  }

  async clickStartBuilding() {
	await this.click(dashboardLocators.startBuildingButton);
  }
}