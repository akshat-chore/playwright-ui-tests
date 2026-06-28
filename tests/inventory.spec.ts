import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { testData } from '../utils/testData';

test.describe('Inventory', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser, testData.password);
  });

  test('inventory page loads after login', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const isLoaded = await inventoryPage.isInventoryLoaded();
    expect(isLoaded).toBe(true);
  });

  test('inventory page shows 6 products', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const names = await inventoryPage.getProductNames();
    expect(names).toHaveLength(6);
  });

  test('cart count updates after adding item', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstItemToCart();
    const count = await inventoryPage.getCartCount();
    expect(count).toBe('1');
  });

  test('cart badge not visible before adding any item', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const isVisible = await inventoryPage.isCartBadgeVisible();
    expect(isVisible).toBe(false);
  });

  test('products can be sorted by name Z to A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const before = await inventoryPage.getProductNames();
    await inventoryPage.sortBy('za');
    const after = await inventoryPage.getProductNames();
    expect(after).not.toEqual(before);
  });

  test('products can be sorted by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    const numbers = prices.map(p => parseFloat(p.replace('$', '')));
    expect(numbers[0]).toBeLessThanOrEqual(numbers[numbers.length - 1]);
  });

});