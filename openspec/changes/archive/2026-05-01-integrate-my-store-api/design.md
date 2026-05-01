# Design: Integrate my-store API with Angular 21 update

## Technical Approach

Migrate the Angular 17 frontend from external API (api.escuelajs.co) to local my-store backend (localhost:3000) through a proxy configuration, while upgrading Angular incrementally (17→21), migrating tests to Jest, and implementing JWT authentication with cart persistence. The approach follows the existing codebase patterns: standalone components, Signals for state, `inject()` function for DI, and path-based aliases (`@shared/*`, `@products/*`, `@info/*`).

## Architecture Decisions

### Decision: Incremental Angular Upgrade

**Choice**: Sequential `ng update` (17→18→19→20→21)

**Alternatives considered**:
- Direct upgrade to 21: Rejected — too many breaking changes at once, harder to debug
- Stay on Angular 17: Rejected — need Angular 21 features and long-term support

**Rationale**: Incremental updates allow `ng build` verification after each step, making it easier to identify and fix breaking changes. Angular's update guide recommends this approach.

### Decision: Testing Framework Migration

**Choice**: Jest 30 + jest-preset-angular 16 + @types/jest

**Alternatives considered**:
- Keep Karma/Jasmine: Rejected — deprecated, slower, no Angular 21 support
- Vitest: Considered but rejected — jest-preset-angular has better Angular integration documentation

**Rationale**: Jest is the Angular community standard for unit testing. The `jest-preset-angular` package handles Angular-specific transformations (templates, styles, zones).

### Decision: API Proxy Strategy

**Choice**: `proxy.conf.json` with `/api/*` → `http://localhost:3000`

**Alternatives considered**:
- Direct localhost:3000 calls: Rejected — CORS issues in development
- Environment-specific configs: Rejected — overkill for this project size

**Rationale**: Angular CLI's proxy config is simple, built-in, and works seamlessly with `ng serve`. No code changes needed for different environments.

### Decision: JWT Storage

**Choice**: localStorage with HttpInterceptor

**Alternatives considered**:
- httpOnly cookies: Ideal but requires backend CORS/cookie setup changes
- Session storage: Rejected — lost on tab close, bad UX

**Rationale**: localStorage is simple, works across tabs, and the interceptor pattern is standard Angular practice. Future improvement: migrate to httpOnly cookies.

### Decision: Cart Persistence

**Choice**: localStorage JSON serialization with Signals

**Alternatives considered**:
- IndexedDB: Overkill for simple cart data
- Session storage: Rejected — cart should persist across sessions

**Rationale**: Follows existing pattern (cart uses Signals). localStorage provides persistence with minimal code. JSON serialization handles the Product object structure.

### Decision: Tailwind CSS v4 Configuration

**Choice**: CSS-based config with `@import "tailwindcss"`

**Alternatives considered**:
- Keep tailwind.config.js (v3 style): Rejected — v4 requires CSS-based approach
- UnoCSS: Rejected — would require rewriting all existing classes

**Rationale**: Tailwind v4 uses CSS imports instead of JS config. This is a breaking change from v3. The `@import "tailwindcss"` approach is cleaner and more performant.

## Data Flow

### Request Flow with Authentication

```
User Action → Component → Service → HttpInterceptor → API
                                     │
                                     └─ Adds: Authorization: Bearer {token}
```

### Auth State Flow

```
Login Page → AuthService.login(credentials)
                ↓
         POST /api/v1/auth/login
                ↓
         JWT received → localStorage.setItem('token', jwt)
                ↓
         Signal updated → AuthService.isAuthenticated = true
                ↓
         HttpInterceptor reads token for future requests
```

### Cart Persistence Flow

```
AddToCart → CartService.addToCart(product)
                ↓
         cart.update(state => [...state, product])
                ↓
         localStorage.setItem('my-store-cart', JSON.stringify(cart()))
                ↓
         On reload: localStorage.getItem('my-store-cart') → cart.set(parsed)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Modify | Angular 17→21, remove karma/jasmine, add jest/jest-preset-angular, tailwind 3→4 |
| `angular.json` | Modify | Change test builder from Karma to Jest, add proxyConfig to serve |
| `proxy.conf.json` | Create | Routes `/api/**` to `http://localhost:3000` |
| `jest.config.ts` | Create | Jest configuration with path mappings for @shared/*, @products/*, @info/*, @auth/* |
| `setup-jest.ts` | Create | Global setup for jest-preset-angular |
| `tsconfig.spec.json` | Modify | Change `"types": ["jasmine"]` to `"types": ["jest"]` |
| `src/styles.css` | Modify | Replace `@tailwind` directives with `@import "tailwindcss"` |
| `tailwind.config.js` | Delete | Replaced by CSS-based Tailwind v4 config |
| `src/app/domains/shared/models/product.model.ts` | Modify | `title→name`, `images[]→image`, `creationAt→createdAt`, `category→categoryId` |
| `src/app/domains/shared/models/category.model.ts` | Modify | Add `image`, `isActive`, `createdAt` fields |
| `src/app/domains/shared/services/product.service.ts` | Modify | Use `/api/v1/products` instead of external API |
| `src/app/domains/shared/services/category.service.ts` | Modify | Use `/api/v1/categories` instead of external API |
| `src/app/domains/shared/services/cart.service.ts` | Modify | Add localStorage persistence |
| `src/app/domains/auth/services/auth.service.ts` | Create | Login, register, logout, token management with Signals |
| `src/app/domains/auth/interceptors/auth.interceptor.ts` | Create | Inject JWT into Authorization header |
| `src/app/domains/auth/guards/auth.guard.ts` | Create | Protect routes from unauthenticated access |
| `src/app/domains/auth/pages/login/login.component.ts` | Create | Login form with email/password |
| `src/app/domains/auth/pages/register/register.component.ts` | Create | Registration form |
| `src/app/domains/auth/pages/profile/profile.component.ts` | Create | User profile display |
| `src/app/domains/auth/components/auth-form/auth-form.component.ts` | Create | Reusable form component for login/register |
| `src/app/app.routes.ts` | Modify | Add auth routes, lazy load auth domain |
| `src/app/app.config.ts` | Modify | Provide HttpClient with interceptor, provideAuthGuard |
| `README.md` | Modify | Update setup instructions, add test commands |

## Interfaces / Contracts

### Updated Product Model

```typescript
// src/app/domains/shared/models/product.model.ts
export interface Product {
  id: number;
  name: string;           // Changed from 'title'
  description: string;
  price: number;
  image: string;          // Changed from 'images: string[]'
  createdAt: string;       // Changed from 'creationAt'
  categoryId: number;     // Changed from 'category: Category'
}
```

### Updated Category Model

```typescript
// src/app/domains/shared/models/category.model.ts
export interface Category {
  id: number;
  name: string;
  image: string;
  isActive: boolean;      // New field
  createdAt: string;      // New field
}
```

### Auth Service Interface

```typescript
// src/app/domains/auth/services/auth.service.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private token = signal<string | null>(localStorage.getItem('token'));
  isAuthenticated = computed(() => !!this.token());

  login(credentials: LoginRequest) { ... }
  register(data: RegisterRequest) { ... }
  logout() { ... }
  getToken(): string | null { return this.token(); }
}
```

### Cart Persistence

```typescript
// src/app/domains/shared/services/cart.service.ts
const CART_STORAGE_KEY = 'my-store-cart';

export class CartService {
  cart = signal<Product[]>(this.loadCart());

  private loadCart(): Product[] {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }
  }

  private saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart()));
  }

  addToCart(product: Product) {
    this.cart.update(state => [...state, product]);
    this.saveCart();
  }
  // ... removeFromCart similar pattern
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | AuthService methods (login, register, logout) | Jest mocks for HttpClient, test Signals state changes |
| Unit | CartService persistence | Mock localStorage, verify save/load cycles |
| Unit | ProductService/CategoryService | Mock HttpClient, verify correct URLs called |
| Unit | Components (Login, Register) | Test template bindings, form validation, button clicks |
| Integration | HttpInterceptor | Test Authorization header injection with mocked requests |
| Integration | AuthGuard | Test redirect for unauthenticated users |

Note: No existing `.spec.ts` files found in codebase. All tests will be created from scratch.

## Migration / Rollout

The migration follows a specific order to minimize breaking changes:

1. **Backup**: Create git branch `integrate-my-store-api`
2. **Angular Upgrade** (sequential):
   - `ng update @angular/core@18 @angular/cli@18` → `ng build`
   - `ng update @angular/core@19 @angular/cli@19` → `ng build`
   - `ng update @angular/core@20 @angular/cli@20` → `ng build`
   - `ng update @angular/core@21 @angular/cli@21` → `ng build`
3. **Dependencies**: Update TypeScript, RxJS, zone.js, Tailwind, Express
4. **Testing**: Remove Karma/Jasmine, install Jest + jest-preset-angular, create configs
5. **Proxy**: Create `proxy.conf.json`, update `angular.json`
6. **Models**: Update Product and Category interfaces
7. **Services**: Update product/category services to use local API
8. **Auth**: Create auth domain (service, interceptor, guard, components)
9. **Cart**: Add localStorage persistence to CartService
10. **Tailwind**: Migrate to v4 CSS-based config
11. **Routes**: Update `app.routes.ts` with auth routes
12. **Config**: Update `app.config.ts` with providers
13. **README**: Update documentation

## Open Questions

- [ ] Should the backend API structure be verified before starting migration? (Endpoint responses, field names)
- [ ] Should we implement refresh token logic or just access token with re-login?
- [ ] Should cart persistence handle product updates (price changes) or store snapshot?
