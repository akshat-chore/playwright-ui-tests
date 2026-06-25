# Playwright UI Test Suite - SauceDemo [version 7]

UI test automation using Playwright with TypeScript on SauceDemo (https://www.saucedemo.com) — a widely used QA practice application simulating an e-commerce storefront.

## Overview

**Application Under Test:**
- **App:** SauceDemo [Demo Application]
- **URL:** https://www.saucedemo.com
- **Type:** E-commerce demo app (login, product listing, cart, checkout)

## Tech Stack

- **Framework:** Playwright (`@playwright/test` ^1.61.0)
- **Language:** TypeScript
- **Node.js:** TypeScript support for type safety
- **CI/CD:** GitHub Actions

## Project Structure

```
playwright-saucedemo/
├── pages/                      # Page Object Model (POM)
│   ├── LoginPage.ts           # Login page object
│   ├── InventoryPage.ts       # Products listing page object
│   ├── CartPage.ts            # Shopping cart page object
│   └── CheckoutPage.ts        # Checkout page object
├── tests/                      # Test specs
│   ├── login.spec.ts          # Login flow tests
│   ├── inventory.spec.ts      # Product listing and sorting tests
│   ├── cart.spec.ts           # Add/remove items from cart tests
│   └── checkout.spec.ts       # End-to-end checkout tests
├── utils/                      # Utilities
│   └── testData.ts            # Test data and constants
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Test Coverage

- ✅ **Login Tests:** Valid login, invalid credentials, locked user scenarios
- ✅ **Inventory Tests:** Product listing, sorting, and filtering
- ✅ **Cart Tests:** Add to cart, remove from cart, quantity management
- ✅ **Checkout Tests:** End-to-end checkout flow

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# View test report
npm run test:report
```

## Status

Implementation complete with all core test scenarios implemented using Page Object Model pattern.

**Last Updated:** June 2026 [v4]
