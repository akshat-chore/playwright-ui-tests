import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

  private page: Page;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueButton: Locator;
  private finishButton: Locator;
  private errorMessage: Locator;
  private confirmationHeader: Locator;
  private confirmationText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.confirmationHeader = page.locator('.complete-header');
    this.confirmationText = page.locator('.complete-text');
  }

  async goto() {
    await this.page.goto('/checkout-step-one.html');
  }

  async fillDetails(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async fillDetailsAndContinue(firstName: string, lastName: string, postalCode: string) {
    await this.fillDetails(firstName, lastName, postalCode);
    await this.clickContinue();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }

  async getConfirmationHeader(): Promise<string> {
    return await this.confirmationHeader.innerText();
  }

  async getConfirmationText(): Promise<string> {
    return await this.confirmationText.innerText();
  }

  async isOrderConfirmed(): Promise<boolean> {
    return await this.confirmationHeader.isVisible();
  }
}