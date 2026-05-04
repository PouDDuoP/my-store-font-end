# Proposal: Integrate my-store API with Angular 21 update

## Executive Summary

Migrate the Angular 17.1.0 frontend from the external api.escuelajs.co API to the local my-store backend at localhost:3000, while upgrading Angular to v21, migrating tests from Karma/Jasmine to Jest, and implementing missing authentication and cart persistence features.

## Intent

The current frontend points to an external API (api.escuelajs.co) that has a different data structure than our local my-store backend. This causes integration issues and prevents full-stack development. Additionally, the project uses outdated Angular 17, Karma/Jasmine for testing, and Tailwind CSS 3. We need to modernize the stack, align with the local backend's API structure, and implement missing auth and persistence features.

## Scope

### In Scope
- Update Angular 17→21 (incremental: 17→18→19→20→21 via ng update)
- Update TypeScript, Tailwind CSS 3→4, RxJS, Express, zone.js
- Migrate from Karma/Jasmine to Jest + jest-preset-angular
- Create proxy.conf.json for localhost:3000 API calls
- Update models (Product, Category) to match backend structure:
  - `title` → `name`
  - `images[]` → `image` (single URL)
  - `creationAt` → `createdAt`
  - `category` (object) → `categoryId` (number)
- Update services (product, category) to use local API at localhost:3000
- Create auth.service with JWT handling (login, register, token storage)
- Create AuthInterceptor for automatic JWT injection
- Create AuthGuard for route protection
- Create login, register, profile components
- Implement cart persistence with localStorage
- Update Tailwind CSS v4 with CSS-based config
- Update README.md with new setup instructions

### Out of Scope
- End-to-end testing implementation (future work)
- Advanced state management beyond Signals (NgRx, etc. - future consideration)
- Server-side rendering changes (keep existing SSR)
- Mobile app development
- Backend API modifications (backend is assumed ready)

## Capabilities

### New Capabilities
- `user-auth`: JWT-based authentication with login, register, and profile management
- `cart-persistence`: localStorage-based cart state persistence across sessions
- `api-integration`: Integration with local my-store backend API at localhost:3000
- `test-infrastructure`: Jest + jest-preset-angular testing setup replacing Karma

### Modified Capabilities
- `product-catalog`: Updated to use local API and match backend Product model (title→name, images→image, creationAt→createdAt)
- `category-browse`: Updated to use local API and match backend Category model structure

## Approach

Follow incremental update strategy for Angular:
1. **Angular Upgrade**: Use `ng update` sequentially: 17→18→19→20→21
2. **Proxy Setup**: Create `proxy.conf.json` to route `/api/*` requests to `localhost:3000`
3. **Model Updates**: Align interfaces with backend:
   - Product: `title→name`, `images[]→image`, `creationAt→createdAt`, `category→categoryId`
   - Category: keep existing structure (matches backend)
4. **Service Updates**: Update product.service.ts and category.service.ts to use proxy-based URLs (`/api/products`, `/api/categories`)
5. **Auth Implementation**: 
   - Create `auth.service.ts` with `login()`, `register()`, `logout()`, `getToken()` methods
   - Use Angular `inject()` function (no constructor injection)
   - Store JWT in localStorage with Signals for reactive state
6. **Testing Migration**: 
   - Remove Karma/Jasmine dependencies
   - Install Jest + jest-preset-angular
   - Update angular.json test builder
   - Convert existing test files
7. **Tailwind v4**: Use CSS-based config (`@import "tailwindcss"`) instead of tailwind.config.js
8. **State Management**: Use Angular Signals for auth state and cart state

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `package.json` | Modified | Angular 17→21, remove Karma/Jasmine, add Jest, Tailwind 3→4 |
| `angular.json` | Modified | Update test builder from Karma to Jest |
| `src/app/domains/shared/models/product.model.ts` | Modified | Align with backend: title→name, images→image, creationAt→createdAt |
| `src/app/domains/shared/models/category.model.ts` | Modified | Align with backend: category object→categoryId |
| `src/app/domains/shared/services/product.service.ts` | Modified | Use localhost:3000 API via proxy |
| `src/app/domains/shared/services/category.service.ts` | Modified | Use localhost:3000 API via proxy |
| `src/app/domains/shared/services/cart.service.ts` | Modified | Add localStorage persistence |
| `src/app/domains/auth/` | New | auth.service.ts, AuthInterceptor, AuthGuard, login/register/profile components |
| `proxy.conf.json` | New | Development proxy to localhost:3000 |
| `tailwind.config.js` | Removed | Replaced by CSS-based Tailwind v4 config |
| `src/styles.css` | Modified | Add Tailwind v4 CSS import |
| `README.md` | Modified | Update setup and testing instructions |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Breaking changes during Angular 17→21 upgrade | High | Incremental updates (17→18→19→20→21), run `ng build` after each step |
| Backend API structure mismatch | Medium | Document backend API structure, create mapping layer if needed |
| Jest migration complexity | Medium | Follow jest-preset-angular documentation, migrate tests incrementally |
| Tailwind v4 breaking changes | Medium | Review Tailwind v4 migration guide, test all styled components |
| JWT token storage security | Low | Use httpOnly cookies in future; currently localStorage with AuthInterceptor |

## Rollback Plan

1. **Before starting**: Create git branch `integrate-my-store-api` from main
2. **If Angular upgrade fails**: 
   - `git reset --hard HEAD` to last working commit
   - Revert to Angular 17 with `npm install @angular/core@17 @angular/cli@17`
3. **If API integration fails**:
   - Revert proxy.conf.json changes
   - Restore services to use api.escuelajs.co temporarily
4. **If Jest migration fails**:
   - Keep Karma configuration as backup in angular.json
   - Run `ng test` with old config while fixing Jest setup
5. **Full rollback**: `git checkout main && git branch -D integrate-my-store-api`

## Dependencies

- Local my-store backend running at localhost:3000 with JWT authentication
- Node.js 18+ (for Angular 21 compatibility)
- npm 9+ or pnpm (for dependency management)

## Success Criteria

- [ ] Angular 21 application builds successfully with `ng build`
- [ ] All product and category API calls successfully reach localhost:3000
- [ ] Product model correctly maps backend fields (name, image, createdAt, categoryId)
- [ ] Jest tests run successfully with `ng test` or `npm test`
- [ ] User can login/register with JWT token stored and injected in API calls
- [ ] Cart state persists across browser sessions via localStorage
- [ ] Tailwind CSS v4 styles render correctly
- [ ] README.md updated with new setup and test instructions
- [ ] No console errors in browser dev tools
