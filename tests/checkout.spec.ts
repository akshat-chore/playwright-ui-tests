import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testData } from '../utils/testData';

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser, testData.password);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
  });

  test('happy path - complete checkout successfully', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillDetailsAndContinue(
      testData.checkout.firstName,
      testData.checkout.lastName,
      testData.checkout.postalCode
    );
    await checkoutPage.finishCheckout();
    const isConfirmed = await checkoutPage.isOrderConfirmed();
    expect(isConfirmed).toBe(true);
  });

  test('confirmation message is correct', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillDetailsAndContinue(
      testData.checkout.firstName,
      testData.checkout.lastName,
      testData.checkout.postalCode
    );
    await checkoutPage.finishCheckout();
    const header = await checkoutPage.getConfirmationHeader();
    expect(header).toContain('Thank you');
  });

  test('missing first name shows error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillDetails('', testData.checkout.lastName, testData.checkout.postalCode);
    await checkoutPage.clickContinue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('First Name is required');
  });

  test('missing last name shows error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillDetails(testData.checkout.firstName, '', testData.checkout.postalCode);
    await checkoutPage.clickContinue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Last Name is required');
  });

  test('missing postal code shows error', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillDetails(testData.checkout.firstName, testData.checkout.lastName, '');
    await checkoutPage.clickContinue();
    const error = await checkoutPage.getErrorMessage();
    expect(error).toContain('Postal Code is required');
  });

});