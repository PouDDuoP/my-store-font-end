# Specification: Integrate my-store API with Angular 21 update

## Overview

This specification defines the behavioral requirements for migrating the Angular 17 frontend from the external api.escuelajs.co API to the local my-store backend, upgrading Angular to v21, and implementing authentication and cart persistence features.

---

## Functional Requirements

### 1. Angular Upgrade (17→21)

The system SHALL be upgraded from Angular 17 to Angular 21 using incremental `ng update` commands.

#### Scenario: Successful incremental upgrade

- GIVEN project is on Angular 17.1.0
- WHEN running `ng update @angular/core@18 @angular/cli@18` then `ng update @angular/core@19 @angular/cli@19` etc.
- THEN Angular 21 is installed without errors
- AND `ng build` completes successfully after each step

#### Scenario: Build verification after upgrade

- GIVEN Angular 21 is installed
- WHEN `ng build` is executed
- THEN build completes with no errors
- AND output is in `dist/` directory

### 2. Testing Migration (Karma/Jasmine → Jest)

The system SHALL migrate from Karma/Jasmine to Jest + jest-preset-angular.

#### Scenario: Jest runs tests

- GIVEN Jest and jest-preset-angular are installed
- WHEN `npm test` is executed
- THEN Jest runs all `*.spec.ts` files
- AND test results display in terminal

#### Scenario: Karma removed

- GIVEN package.json is inspected
- THEN `karma`, `jasmine-core` are NOT present
- AND `angular.json` uses Jest builder

### 3. Proxy Configuration

The system SHALL configure `proxy.conf.json` to route `/api/**` requests to `http://localhost:3000`.

#### Scenario: API requests proxied

- GIVEN Angular dev server runs with `--proxy-config proxy.conf.json`
- WHEN request is made to `/api/v1/products`
- THEN request proxies to `http://localhost:3000/api/v1/products`

---

## Domain Specifications

### User Auth (NEW)

JWT-based authentication with login, register, profile management, and route protection.

#### Requirement: User Login

The system SHALL allow users to authenticate via POST `/api/v1/auth/login` and store JWT in localStorage.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Success | On login page | Valid credentials submitted | JWT stored, redirected home |
| Invalid | On login page | Invalid credentials | Error shown, no token stored |
| JWT injection | Valid JWT exists | API request made | `Authorization: Bearer` header added |

#### Requirement: User Registration

The system SHALL allow registration via POST `/api/v1/auth/register`.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Success | On register page | Valid data submitted | Account created, redirect to login |
| Duplicate | On register page | Existing email used | Error: email exists |

#### Requirement: Route Protection

The system SHALL prevent unauthenticated access to protected routes via AuthGuard.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Unauth access | No valid JWT | Navigate to `/profile` | Redirect to `/login` |
| Auth access | Valid JWT | Navigate to `/profile` | Profile page loads |

#### Requirement: Password Recovery

The system SHALL support password recovery via POST `/api/v1/auth/recovery`.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Valid request | On login page | Click forgot password | Recovery email sent |
| Invalid email | On recovery page | Non-existent email | Error: email not found |

---

### Cart Persistence (NEW)

Persist cart state across browser sessions using localStorage and Angular Signals.

#### Requirement: Cart State Persistence

The system SHALL persist cart items to localStorage and restore on page reload.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Add persists | Empty cart | Add product | Item saved to localStorage |
| Reload persists | Items in localStorage | Page reloads | Cart restores from storage |
| Clear persists | Items in cart | Clear cart | localStorage cleared |

#### Requirement: Cart Data Structure

The system SHALL store cart as JSON array under `my-store-cart` key.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Valid structure | Items added | Inspect localStorage | Valid JSON array with productId, title, price, quantity, image |
| Corrupted data | Invalid JSON in storage | App loads | Cart initializes empty, corrupted data cleared |

---

### API Integration (NEW)

Integrate with local my-store backend at localhost:3000.

#### Requirement: Product API Endpoint

The system SHALL fetch products from `/api/v1/products` (proxied to localhost:3000).

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Fetch products | Backend running | App loads products | GET `/api/v1/products`, response has name, image, createdAt, categoryId |
| API error | Backend down | Products requested | Error displayed, retry available |

#### Requirement: Category API Endpoint

The system SHALL fetch categories from `/api/v1/categories`.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Fetch categories | Backend running | App loads categories | GET `/api/v1/categories`, response has id, name, image, isActive, createdAt |

#### Requirement: Model Alignment

The system SHALL use interfaces matching backend structure.

| Field | Old (api.escuelajs.co) | New (localhost:3000) |
|-------|------------------------|----------------------|
| Product name | `title` | `name` |
| Product images | `images[]` (array) | `image` (string) |
| Product date | `creationAt` | `createdAt` |
| Product category | `category` (object) | `categoryId` (number) |
| Category image | (not present) | `image` (string) |
| Category active | (not present) | `isActive` (boolean) |
| Category date | (not present) | `createdAt` (date) |

---

### Product Catalog (MODIFIED)

Updated to use local API and match backend Product model.

#### Requirement: Fetch Products from Local API

The system SHALL fetch products from `/api/v1/products`.
(Previously: System fetched from https://api.escuelajs.co/api/v1/products)

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Load products | App initializes | Products loaded | GET `/api/v1/products` |
| API error | Backend unavailable | Request made | Error displayed, retry option |

#### Requirement: Product Model Matches Backend

The system SHALL use Product interface: `name`, `image`, `createdAt`, `categoryId`.
(Previously: Used `title`, `images[]`, `creationAt`, `category` object)

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Interface structure | Product from API | Inspect object | Has `name`, `image`, `createdAt`, `categoryId` |
| Display in UI | Product loaded | Card rendered | Shows `name`, single `image`, formatted `createdAt` |

---

### Category Browse (MODIFIED)

Updated to use local API and match backend Category model.

#### Requirement: Fetch Categories from Local API

The system SHALL fetch categories from `/api/v1/categories`.
(Previously: System fetched from https://api.escuelajs.co/api/v1/categories)

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Load categories | App initializes | Categories loaded | GET `/api/v1/categories` |
| API error | Backend unavailable | Request made | Error displayed, retry option |

#### Requirement: Category Model Matches Backend

The system SHALL use Category interface: `id`, `name`, `image`, `isActive`, `createdAt`.
(Previously: May have had different structure without `image`, `isActive`, `createdAt`)

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Interface structure | Category from API | Inspect object | Has `id`, `name`, `image`, `isActive`, `createdAt` |
| Display in nav | Categories loaded | List rendered | Shows `name`, `image` thumbnail, inactive distinct |

---

### Test Infrastructure (NEW)

Migrate testing framework to Jest + jest-preset-angular.

#### Requirement: Jest Configuration

The system SHALL use Jest with jest-preset-angular.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Run tests | Jest installed | `npm test` executed | Jest runs `*.spec.ts` files |
| Angular.json | Config inspected | Check test builder | Uses Jest builder, NOT Karma |

#### Requirement: Test Compatibility

The system SHALL support Jest syntax in test files.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Describe/it blocks | Test file | Jest runs | `describe()` and `it()` execute correctly |
| Mock injection | Test needs mock | Using `jest.mock()` | Mocked service used |
| Async testing | Test has async ops | Using `fakeAsync()` | Async completes, assertions run |

---

## Non-Functional Requirements

### Performance

- **Lazy loading**: ALL domains SHALL use lazy loading via `loadChildren` in routing
- **Preloading strategy**: SHALL use `withPreloading(PreloadAllModules)` for all modules

### Security

- **JWT storage**: Token SHALL be stored in localStorage (future: httpOnly cookies)
- **Token injection**: AuthInterceptor SHALL inject `Authorization: Bearer {token}` header on all API requests
- **Route protection**: AuthGuard SHALL prevent unauthenticated access to `/profile` and other protected routes

### Compatibility

- **Angular**: 21+ (upgraded from 17)
- **TypeScript**: 6+ (aligned with Angular 21)
- **Node.js**: 20+ (required for Angular 21)
- **Tailwind CSS**: 4+ (upgraded from 3, using CSS-based config)

### Accessibility (WCAG 2.2 AA)

- **Images**: All `<img>` tags MUST have `alt` attribute (empty `alt=""` for decorative)
- **Forms**: Labels MUST be associated with inputs via `for`/`id` or wrapping `<label>`
- **Keyboard**: All interactive elements MUST be focusable without mouse
- **ARIA**: Use `role`, `aria-label` only when HTML semantics insufficient
- **Color contrast**: 4.5:1 for normal text, 3:1 for large text

### Tailwind CSS v4

- **Config approach**: SHALL use CSS-based config with `@import "tailwindcss"` in `src/styles.css`
- **No tailwind.config.js**: File SHALL be removed (replaced by CSS-based approach)

---

## Scenarios (Given/When/Then)

### Application Startup

- **GIVEN** user opens app
- **WHEN** app loads
- **THEN** products are fetched from `localhost:3000/api/v1/products`
- **AND** categories are fetched from `localhost:3000/api/v1/categories`

### Authentication Flow

- **GIVEN** user clicks login
- **WHEN** credentials are valid
- **THEN** JWT is stored in localStorage
- **AND** user is redirected to home page

### Cart Persistence

- **GIVEN** user adds product to cart
- **WHEN** page reloads
- **THEN** cart persists from localStorage
- **AND** cart icon badge shows correct item count

### Angular Upgrade

- **GIVEN** project is on Angular 17
- **WHEN** running `ng update` sequentially (17→18→19→20→21)
- **THEN** Angular 21 is installed without errors
- **AND** `ng build` completes successfully

### Tailwind v4 Migration

- **GIVEN** project uses Tailwind CSS 3 with `tailwind.config.js`
- **WHEN** migrating to Tailwind CSS 4
- **THEN** `tailwind.config.js` is removed
- **AND** `src/styles.css` uses `@import "tailwindcss"`

---

## Delta Summary

### Changes from Current Behavior

| Area | Old Behavior | New Behavior |
|------|--------------|--------------|
| Products API | https://api.escuelajs.co/api/v1/products | /api/v1/products (proxied to localhost:3000) |
| Categories API | https://api.escuelajs.co/api/v1/categories | /api/v1/categories (proxied to localhost:3000) |
| Product interface | `title`, `images[]`, `creationAt`, `category` object | `name`, `image`, `createdAt`, `categoryId` |
| Category interface | Basic fields | + `image`, `isActive`, `createdAt` |
| Testing framework | Karma + Jasmine | Jest + jest-preset-angular |
| Angular version | 17.1.0 | 21+ |
| Tailwind version | 3.x with JS config | 4.x with CSS config |
| Auth system | None | JWT-based with login, register, profile |
| Cart persistence | In-memory only | localStorage persistence |
| Token handling | None | AuthInterceptor injects JWT |

---

## Coverage

- **Happy paths**: Covered (login, register, fetch products, add to cart, persistence)
- **Edge cases**: Covered (invalid credentials, API errors, corrupted localStorage, unauthenticated access)
- **Error states**: Covered (API unavailable, duplicate email, incorrect password)

---

## Next Step

Ready for design (sdd-design). If design already exists, ready for tasks (sdd-tasks).
