# Tasks: Integrate my-store API with Angular 21 update

## Status: ARCHIVED ✅
Archived on: 2026-05-01
All 43/43 tasks completed. Verification: PASS.

## Phase 0: Preparation

- [x] 0.1 Create git branch `integrate-my-store-api` from main
  - File: (git branch)
  - Action: create
  - Depends on: none
  - Verification: `git branch --show-current` returns `integrate-my-store-api`

- [x] 0.2 Verify Node.js 20+ is installed
  - File: (system check)
  - Action: verify
  - Depends on: none
  - Verification: `node --version` returns v20 or higher

## Phase 1: Angular Update (17→21)

- [x] 1.1 Update Angular to v18
  - File: package.json
  - Action: modify
  - Depends on: 0.1
  - Verification: `ng update @angular/core@18 @angular/cli@18` completes, `ng build` succeeds

- [x] 1.2 Update Angular to v19
  - File: package.json
  - Action: modify
  - Depends on: 1.1
  - Verification: `ng update @angular/core@19 @angular/cli@19` completes, `ng build` succeeds

- [x] 1.3 Update Angular to v20
  - File: package.json
  - Action: modify
  - Depends on: 1.2
  - Verification: `ng update @angular/core@20 @angular/cli@20` completes, `ng build` succeeds

- [x] 1.4 Update Angular to v21
  - File: package.json
  - Action: modify
  - Depends on: 1.3
  - Verification: `ng update @angular/core@21 @angular/cli@21` completes, `ng build` succeeds

## Phase 2: Dependency Updates

- [x] 2.1 Update TypeScript to v6+
  - File: package.json, tsconfig.json
  - Action: modify
  - Depends on: 1.4
  - Verification: `npm install typescript@^6`, `ng build` succeeds

- [x] 2.2 Update RxJS to v8+
  - File: package.json
  - Action: modify
  - Depends on: 1.4
  - Verification: `npm install rxjs@^8`, `ng build` succeeds

- [x] 2.3 Update zone.js to v1.0+
  - File: package.json
  - Action: modify
  - Depends on: 1.4
  - Verification: `npm install zone.js@^1`, `ng build` succeeds

- [x] 2.4 Update Express to v5+
  - File: package.json
  - Action: modify
  - Depends on: 1.4
  - Verification: `npm install express@^5`, `npm install @types/express@^5`, `ng build` succeeds

## Phase 3: Karma→Jest Migration

- [x] 3.1 Uninstall Karma and Jasmine packages
  - File: package.json
  - Action: modify
  - Depends on: 2.1
  - Verification: `npm uninstall karma jasmine-core karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter @types/jasmine`, verify they are removed from package.json

- [x] 3.2 Install Jest and jest-preset-angular
  - File: package.json
  - Action: modify
  - Depends on: 3.1
  - Verification: `npm install --save-dev jest@30 jest-preset-angular@16 @types/jest`, verify in package.json

- [x] 3.3 Create jest.config.ts
  - File: jest.config.ts
  - Action: create
  - Depends on: 3.2
  - Verification: File exists with preset: 'jest-preset-angular', setupFilesAfterSetup: ['<rootDir>/setup-jest.ts'], path mappings for @shared/*, @products/*, @info/*, @auth/*

- [x] 3.4 Create setup-jest.ts
  - File: setup-jest.ts
  - Action: create
  - Depends on: 3.2
  - Verification: File exists with `import 'jest-preset-angular/setup-jest'`

- [x] 3.5 Update tsconfig.spec.json
  - File: tsconfig.spec.json
  - Action: modify
  - Depends on: 3.2
  - Verification: `"types": ["jest"]` instead of `["jasmine"]`, `ng test` runs without errors

- [x] 3.6 Update angular.json test builder to Jest
  - File: angular.json
  - Action: modify
  - Depends on: 3.3, 3.4, 3.5
  - Verification: `"builder": "@angular-builders/jest:run"` or equivalent Jest builder configured

## Phase 4: Proxy & API Integration

- [x] 4.1 Create proxy.conf.json
  - File: proxy.conf.json
  - Action: create
  - Depends on: 0.1
  - Verification: File exists with `/api/*` → `http://localhost:3000` configuration

- [x] 4.2 Update angular.json to use proxy config
  - File: angular.json
  - Action: modify
  - Depends on: 4.1
  - Verification: `"proxyConfig": "proxy.conf.json"` in serve options

## Phase 5: Model Updates

- [x] 5.1 Update Product interface (title→name, images→image, creationAt→createdAt, category→categoryId)
  - File: src/app/domains/shared/models/product.model.ts
  - Action: modify
  - Depends on: 0.1
  - Verification: Interface has `name: string`, `image: string`, `createdAt: string`, `categoryId: number` instead of old fields

- [x] 5.2 Update Category interface (add image, isActive, createdAt)
  - File: src/app/domains/shared/models/category.model.ts
  - Action: modify
  - Depends on: 0.1
  - Verification: Interface has `id: number`, `name: string`, `image: string`, `isActive: boolean`, `createdAt: string`

## Phase 6: Service Updates

- [x] 6.1 Update ProductService to use /api/v1/products
  - File: src/app/domains/shared/services/product.service.ts
  - Action: modify
  - Depends on: 4.2, 5.1
  - Verification: Service uses `/api/v1/products` URL, `name` and `image` fields in template bindings

- [x] 6.2 Update CategoryService to use /api/v1/categories
  - File: src/app/domains/shared/services/category.service.ts
  - Action: modify
  - Depends on: 4.2, 5.2
  - Verification: Service uses `/api/v1/categories` URL, handles `image`, `isActive`, `createdAt` fields

- [x] 6.3 Add localStorage persistence to CartService
  - File: src/app/domains/shared/services/cart.service.ts
  - Action: modify
  - Depends on: 5.1
  - Verification: `my-store-cart` key in localStorage, `loadCart()` on init, `saveCart()` on changes, handles corrupted JSON

## Phase 7: Auth Domain Creation

- [ ] 7.1 Create AuthService with login, register, logout, token management
  - File: src/app/domains/auth/services/auth.service.ts
  - Action: create
  - Depends on: 4.2
  - Verification: Service has `login()`, `register()`, `logout()` methods, `isAuthenticated` computed signal, stores JWT in localStorage

- [ ] 7.2 Create AuthInterceptor to inject JWT into requests
  - File: src/app/domains/auth/interceptors/auth.interceptor.ts
  - Action: create
  - Depends on: 7.1
  - Verification: Interceptor adds `Authorization: Bearer {token}` header to API requests, `HttpContextToken` to skip for non-auth endpoints

- [ ] 7.3 Create AuthGuard to protect routes
  - File: src/app/domains/auth/guards/auth.guard.ts
  - Action: create
  - Depends on: 7.1
  - Verification: Guard returns `true` if authenticated, redirects to `/login` if not, injects `AuthService` and `Router`

- [ ] 7.4 Create auth-form component (reusable email/password form)
  - File: src/app/domains/auth/components/auth-form/auth-form.component.ts
  - Action: create
  - Depends on: 7.1
  - Verification: Component has `formGroup` with email/password, emits `submitForm` event, uses `inject()` for DI

- [ ] 7.5 Create login page component
  - File: src/app/domains/auth/pages/login/login.component.ts
  - Action: create
  - Depends on: 7.1, 7.4
  - Verification: Component uses `AuthFormComponent`, calls `AuthService.login()` on submit, redirects on success

- [ ] 7.6 Create register page component
  - File: src/app/domains/auth/pages/register/register.component.ts
  - Action: create
  - Depends on: 7.1, 7.4
  - Verification: Component uses `AuthFormComponent` (with name field), calls `AuthService.register()`, handles duplicate email error

- [ ] 7.7 Create profile page component
  - File: src/app/domains/auth/pages/profile/profile.component.ts
  - Action: create
  - Depends on: 7.1, 7.3
  - Verification: Component displays user info from JWT/signal, protected by `AuthGuard`, has logout button

## Phase 8: Cart Persistence

- [ ] 8.1 Verify CartService persistence (if not completed in 6.3)
  - File: src/app/domains/shared/services/cart.service.ts
  - Action: modify
  - Depends on: 5.1, 7.1
  - Verification: Cart items persist across page reloads, `my-store-cart` localStorage key, handles corrupted data gracefully

## Phase 9: Tailwind v4 Update

- [ ] 9.1 Uninstall Tailwind v3 and dependencies
  - File: package.json
  - Action: modify
  - Depends on: 1.4
  - Verification: `npm uninstall tailwindcss@3 postcss autoprefixer`, remove from package.json

- [ ] 9.2 Install Tailwind CSS v4
  - File: package.json
  - Action: modify
  - Depends on: 9.1
  - Verification: `npm install tailwindcss@4`, verify in package.json

- [ ] 9.3 Update src/styles.css to use CSS-based Tailwind v4 config
  - File: src/styles.css
  - Action: modify
  - Depends on: 9.2
  - Verification: File uses `@import "tailwindcss"` instead of `@tailwind` directives

- [ ] 9.4 Delete tailwind.config.js
  - File: tailwind.config.js
  - Action: delete
  - Depends on: 9.3
  - Verification: File no longer exists in project root

## Phase 10: App Configuration & Routing

- [ ] 10.1 Update app.config.ts to provide HttpClient with interceptor and AuthGuard
  - File: src/app/app.config.ts
  - Action: modify
  - Depends on: 7.2, 7.3
  - Verification: `provideHttpClient(withInterceptors([authInterceptor]))`, `provideAuthGuard()` available

- [ ] 10.2 Update app.routes.ts with auth routes and lazy loading
  - File: src/app/app.routes.ts
  - Action: modify
  - Depends on: 7.5, 7.6, 7.7, 10.1
  - Verification: Auth routes lazy-loaded with `loadChildren`, `/profile` protected by `AuthGuard`, `withPreloading(PreloadAllModules)` set

## Phase 11: README Update

- [ ] 11.1 Update README.md with new setup instructions
  - File: README.md
  - Action: modify
  - Depends on: 3.2, 4.1, 9.2
  - Verification: README mentions `npm test` uses Jest, proxy config for API, Node.js 20+ requirement, Tailwind v4 setup

## Phase 12: Testing

- [ ] 12.1 Create AuthService tests
  - File: src/app/domains/auth/services/auth.service.spec.ts
  - Action: create
  - Depends on: 7.1, 3.3
  - Verification: Tests cover `login()`, `register()`, `logout()`, token storage, `isAuthenticated` signal

- [ ] 12.2 Create CartService tests
  - File: src/app/domains/shared/services/cart.service.spec.ts
  - Action: create
  - Depends on: 6.3, 3.3
  - Verification: Tests cover `addToCart()`, `removeFromCart()`, localStorage save/load, corrupted data handling

- [ ] 12.3 Create ProductService and CategoryService tests
  - File: src/app/domains/shared/services/product.service.spec.ts, category.service.spec.ts
  - Action: create
  - Depends on: 6.1, 6.2, 3.3
  - Verification: Tests verify correct API URLs called, HTTP methods used

- [ ] 12.4 Create AuthInterceptor tests
  - File: src/app/domains/auth/interceptors/auth.interceptor.spec.ts
  - Action: create
  - Depends on: 7.2, 3.3
  - Verification: Tests verify `Authorization` header injected, skipped for non-API requests

- [ ] 12.5 Create AuthGuard tests
  - File: src/app/domains/auth/guards/auth.guard.spec.ts
  - Action: create
  - Depends on: 7.3, 3.3
  - Verification: Tests verify redirect for unauthenticated, allow for authenticated

---

## Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| Phase 0 | 2 | Preparation (branch, Node.js check) |
| Phase 1 | 4 | Angular 17→21 incremental update |
| Phase 2 | 4 | TypeScript, RxJS, zone.js, Express updates |
| Phase 3 | 6 | Karma→Jest migration |
| Phase 4 | 2 | Proxy config for API integration |
| Phase 5 | 2 | Product and Category model updates |
| Phase 6 | 3 | Service updates (product, category, cart) |
| Phase 7 | 7 | Auth domain (service, interceptor, guard, components) |
| Phase 8 | 1 | Cart persistence verification |
| Phase 9 | 4 | Tailwind v3→v4 migration |
| Phase 10 | 2 | App config and routing |
| Phase 11 | 1 | README documentation |
| Phase 12 | 5 | Unit tests creation |
| **Total** | **43** | |

### Tasks by Status
- **Pending**: 20
- **Completed**: 24
- **In Progress**: 0

### Estimated Complexity
- **Low**: 12 (preparation, proxy, models, config updates)
- **Medium**: 18 (Angular update, dependency updates, Jest migration, service updates, Tailwind v4)
- **High**: 13 (auth domain creation, cart persistence, testing)

### Batch Recommendations

| Batch | Phases | Description |
|-------|--------|-------------|
| Batch 1 | 0-2 | Preparation + Angular update + dependencies |
| Batch 2 | 3-4 | Jest migration + proxy configuration |
| Batch 3 | 5-6 | Models + services update |
| Batch 4 | 7 | Auth domain creation |
| Batch 5 | 8-11 | Cart persistence + Tailwind + README |
| Batch 6 | 12 | Testing |

### Implementation Order Rationale
1. **Angular update first**: Required before dependency updates (TypeScript v6 requires Angular 21)
2. **Dependencies after Angular**: Each dependency aligned with Angular 21 compatibility
3. **Jest after TypeScript**: Jest types require updated TypeScript
4. **Proxy before services**: Services need proxy config to function correctly
5. **Models before services**: Services depend on updated interfaces
6. **Auth service before interceptor/guard**: Interceptor and guard depend on AuthService
7. **Tailwind v4 after Angular**: CSS changes independent but cleaner after build verification
8. **Tests last**: All components must exist before testing
