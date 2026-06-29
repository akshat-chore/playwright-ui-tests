# Playwright UI Automation — SauceDemo 

![Playwright](https://img.shields.io/badge/Playwright-1.x-green?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![CI](https://github.com/akshat-chore/playwright-ui-tests/actions/workflows/playwright.yml/badge.svg)

A production-quality UI test automation framework built with **Playwright** and **TypeScript**, using the **Page Object Model (POM)** design pattern. Tests cover core e-commerce user flows on [SauceDemo](https://www.saucedemo.com) — a practice application built specifically for testing.

Built as a portfolio project to demonstrate professional QA/SDET skills including structured test architecture, positive and negative scenario coverage, and CI/CD integration via GitHub Actions.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev) | Browser automation and test runner |
| TypeScript | Strongly typed test code |
| Page Object Model | Design pattern for maintainable test architecture |
| GitHub Actions | CI/CD — runs tests automatically on every push |
| HTML Reporter | Built-in Playwright report for test results |

---

## Project Structure

```
playwright-saucedemo/
├── pages/                    # Page Object classes — one file per page
│   ├── LoginPage.ts          # Login page interactions and locators
│   ├── InventoryPage.ts      # Product listing page interactions
│   ├── CartPage.ts           # Shopping cart interactions
│   └── CheckoutPage.ts       # Checkout flow interactions
├── tests/                    # Test spec files — one file per feature
│   ├── login.spec.ts         # Login positive and negative scenarios
│   ├── inventory.spec.ts     # Product listing and sort scenarios
│   ├── cart.spec.ts          # Cart add, remove, and verify scenarios
│   └── checkout.spec.ts      # Checkout happy path and validation errors
├── utils/
│   └── testData.ts           # Centralised test credentials and data
├── .github/
│   └── workflows/
│       └── playwright.yml    # GitHub Actions CI workflow
├── playwright.config.ts      # Playwright configuration
└── tsconfig.json             # TypeScript configuration
```

### Why this structure matters

Test files never contain selectors. All selectors and page interactions live inside the `pages/` classes. If a selector changes in the application, you fix it in one place — the page object — and every test that uses it is automatically fixed. This is the core benefit of POM.

---

## Test Coverage

### Login (`login.spec.ts`)
| Scenario | Type |
|---|---|
| Valid credentials redirect to inventory | Positive |
| Locked out user sees error message | Negative |
| Wrong password shows error message | Negative |
| Empty username shows validation error | Negative |
| Empty password shows validation error | Negative |

### Inventory (`inventory.spec.ts`)
| Scenario | Type |
|---|---|
| Inventory page loads after login | Positive |
| Page shows 6 products | Positive |
| Cart count updates after adding item | Positive |
| Cart badge not visible before adding items | Negative |
| Products can be sorted Z to A | Positive |
| Products sorted by price low to high | Positive |

### Cart (`cart.spec.ts`)
| Scenario | Type |
|---|---|
| Added item appears in cart | Positive |
| Cart is empty by default | Positive |
| Removing item empties the cart | Negative |
| Cart shows correct item name after adding | Positive |
| Multiple items can be added to cart | Positive |

### Checkout (`checkout.spec.ts`)
| Scenario | Type |
|---|---|
| Complete checkout successfully (happy path) | Positive |
| Confirmation message is correct | Positive |
| Missing first name shows error | Negative |
| Missing last name shows error | Negative |
| Missing postal code shows error | Negative |

**Total: 21 test cases across 4 feature areas**

---

## How to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/akshat-chore/playwright-ui-tests.git
cd playwright-ui-tests

# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install chromium
```

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.ts
```

### Run tests with list output

```bash
npx playwright test --reporter=list
```

### View the HTML report after running

```bash
npx playwright show-report
```

This opens an interactive HTML report in your browser showing pass/fail status, screenshots on failure, and video recordings.

---

## CI/CD — GitHub Actions

Every push to `main` automatically triggers the test suite on GitHub Actions.

### What happens on every push

1. GitHub spins up a fresh Ubuntu machine
2. Node.js 20 is installed
3. Project dependencies are installed via `npm ci`
4. Chromium browser is installed
5. All 21 Playwright tests are executed
6. HTML report is uploaded as a downloadable artifact

### Viewing CI results

1. Go to the **Actions** tab in this repository
2. Click the latest workflow run
3. Green tick = all tests passed
4. If any tests fail, scroll down to **Artifacts** and download `playwright-report` to see the full HTML report with failure details

### Workflow configuration

```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

Tests run on both direct pushes and pull requests, ensuring no broken code reaches `main`.

---

## Design Decisions

**Page Object Model over raw scripting** — Every selector and browser interaction is encapsulated inside page classes. Tests read like plain English and are completely decoupled from implementation details.

**Centralised test data** — All credentials and input data live in `utils/testData.ts`. No hardcoded strings inside test files. Changing a credential means changing one line in one file.

**Negative scenario coverage** — Every feature has both positive and negative test cases. Validation errors, locked users, empty fields, and missing form data are all explicitly tested.

**`beforeEach` hooks** — Repeated setup steps like login are written once in `beforeEach` blocks, not duplicated across every test. This keeps tests focused on what's unique to each scenario.

**`if: always()` on report upload** — The HTML report uploads to GitHub even when tests fail. This is intentional — a failing run is exactly when you need the report most.

---

## What I Would Add Next

- **Cross-browser testing** — run the same suite on Firefox and WebKit
- **Visual regression testing** — screenshot comparisons using Playwright's built-in visual testing
- **Test data factories** — dynamically generate test data instead of static values
- **Allure reporting** — richer test reports with trend history across runs
- **Parallel execution** — run test files simultaneously to reduce total CI time
- **Environment configuration** — support staging and production environments via `.env` files

---

## Author [version 5]

**Akshat** — QA Engineer Intern  
[GitHub](https://github.com/akshat-chore) · [LinkedIn](https://linkedin.com/in/akshat-chore)