import { Page, Locator } from '@playwright/test';

export class CartPage {

  private page: Page;
  private cartItems: Locator;
  private cartItemNames: Locator;
  private removeButtons: Locator;
  private checkoutButton: Locator;
  private continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.removeButtons = page.locator('[data-test^="remove"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async removeFirstItem() {
    await this.removeButtons.first().click();
  }

  async removeItemByIndex(index: number) {
    await this.removeButtons.nth(index).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.cartItemNames.allInnerTexts();
  }

  async isCartEmpty(): Promise<boolean> {
    const count = await this.cartItems.count();
    return count === 0;
  }
}