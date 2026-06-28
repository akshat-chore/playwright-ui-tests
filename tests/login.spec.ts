import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../utils/testData';

test.describe('Login', () => {

  test('valid user can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser, testData.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('locked out user sees error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.lockedUser, testData.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('locked out');
  });

  test('wrong password shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser, 'wrongpassword');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('empty username shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', testData.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

  test('empty password shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validUser, '');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
  });

});