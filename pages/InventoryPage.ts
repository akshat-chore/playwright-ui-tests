import { Page, Locator } from '@playwright/test';

export class InventoryPage {

  private page: Page;
  private productList: Locator;
  private cartIcon: Locator;
  private cartBadge: Locator;
  private sortDropdown: Locator;
  private addToCartButtons: Locator;
  private productNames: Locator;
  private productPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.inventory_list');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('.product_sort_container');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  async addItemByIndex(index: number) {
    await this.addToCartButtons.nth(index).click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getCartCount(): Promise<string> {
    return await this.cartBadge.innerText();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  async getProductNames(): Promise<string[]> {
    return await this.productNames.allInnerTexts();
  }

  async getProductPrices(): Promise<string[]> {
    return await this.productPrices.allInnerTexts();
  }

  async isInventoryLoaded(): Promise<boolean> {
    return await this.productList.isVisible();
  }
}