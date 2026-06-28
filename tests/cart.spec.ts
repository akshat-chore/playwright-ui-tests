import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { testData } from '../utils/testData';

test.describe('Cart', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser, testData.password);
  });

  test('added item appears in cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(1);
  });

  test('cart is empty by default', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBe(true);
  });

  test('removing item empties the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.removeFirstItem();
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBe(true);
  });

  test('cart shows correct item name after adding', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productNames = await inventoryPage.getProductNames();
    const firstProductName = productNames[0];
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(firstProductName);
  });

  test('multiple items can be added to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemByIndex(0);
    await inventoryPage.addItemByIndex(1);
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(2);
  });

});