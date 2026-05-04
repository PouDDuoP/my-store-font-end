# My Store Frontend

Frontend Angular 21+ para la aplicación de comercio electrónico My Store.

## Tecnologías
- **Angular 21+** (Standalone components, Signals, Signal-based architecture)
- **Tailwind CSS 4+** (Utility-first styling, Emerald Soft palette)
- **Jest** (Testing framework)
- **JWT Authentication** (with localStorage persistence)
- **i18n System** (Runtime EN/ES translation with TranslatePipe)

## Características
- ✅ Lista de productos con filtro por categorías
- ✅ Detalle de producto con galería de imágenes
- ✅ Carrito de compras con persistencia (localStorage)
- ✅ Página de carrito dedicada (`/cart`)
- ✅ Autenticación de usuarios (Login/Register)
- ✅ Perfil de usuario
- ✅ **Sistema de traducciones i18n** (EN/ES runtime switching)
- ✅ **Paleta de colores Emerald Soft** (#A7C4A0, #F5F5F5, #333333)
- ✅ Diseño responsivo (Mobile-first)
- ✅ **58 claves de traducción** para EN y ES

## Instalación

### Requisitos
- Node.js 20+ 
- npm o yarn
- Backend my-store corriendo en localhost:3000

### Pasos
1. Clonar repositorio:
   ```bash
   git clone <repo-url>
   cd my-store-front-end
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar proxy (ya incluido en proxy.conf.json)
   - Apunta a `http://localhost:3000`

4. Iniciar servidor de desarrollo:
   ```bash
   npm start
   # O: ng serve
   ```
   La aplicación estará disponible en `http://localhost:4200`

## Scripts Disponibles
- `npm start`: Servidor de desarrollo (localhost:4200)
- `npm run build`: Build de producción (dist/)
- `npm test`: Ejecutar tests con Jest (24 tests)
- `npm run test:watch`: Tests en modo watch

## Sistema de Traducciones (i18n)

La aplicación cuenta con un sistema completo de traducciones en tiempo de ejecución:

### Características
- **Cambio de idioma dinámico** sin recargar la página (EN ↔ ES)
- **TranslatePipe** impuro (`pure: false`) para reactividad automática
- **58 claves de traducción** por idioma
- Estructura anidada: `nav.*`, `auth.*`, `products.*`, `cart.*`, `common.*`, `about.*`, `profile.*`, `search.*`, `product.*`, `check-out.*`, `language.*`

### Archivos de idioma
- `src/assets/i18n/en.json` - Inglés (58 claves)
- `src/assets/i18n/es.json` - Español (58 claves)

### Uso en plantillas
```html
<!-- Con TranslatePipe -->
<h1>{{ 'cart.myCart' | translate }}</h1>

<!-- Con interpolación de parámetros -->
<p>{{ 'language.switchTo' | translate:{lang: 'Español'} }}</p>
```

### Cambio de idioma
El servicio `LanguageService` maneja el cambio de idioma:
```typescript
// Inyectar el servicio
constructor(public languageService: LanguageService) {}

// Toggle idioma
this.languageService.toggleLanguage();
```

## Estructura del Proyecto
```
src/
├── app/
│   ├── domains/
│   │   ├── shared/        # Componentes, servicios, pipes y modelos compartidos
│   │   │   ├── components/   # Header, Layout, Logo, SearchBar, etc.
│   │   │   ├── pages/        # Cart page, NotFound
│   │   │   ├── services/     # CartService, ProductService, LanguageService, AuthService
│   │   │   ├── pipes/        # TranslatePipe, TimeAgoPipe
│   │   │   └── models/       # Product, Category
│   │   ├── products/      # Páginas y componentes de productos
│   │   ├── info/          # Páginas de información (About, NotFound)
│   │   └── auth/          # Autenticación (login, register, profile, guards)
│   ├── app.config.ts
│   ├── app.routes.ts      # Rutas incluyendo /cart
│   └── app.component.ts
├── assets/
│   └── i18n/             # Archivos de traducción (en.json, es.json)
├── styles.css             # Tailwind CSS v4 + Emerald Soft palette (@theme)
└── main.ts
```

## Integración con Backend
- **Proxy**: `proxy.conf.json` redirige `/api` a `localhost:3000`
- **API Endpoints**:
  - Productos: `/api/v1/products`
  - Categorías: `/api/v1/categories`
  - Auth: `/api/v1/auth/login`, `/auth/recovery`, `/auth/change-password`
- **Autenticación**: JWT almacenado en localStorage, inyectado vía HttpInterceptor

## Configuración de Testing
- **Framework**: Jest 30+ con jest-preset-angular
- **Config**: `jest.config.ts` en raíz
- **Ejecutar**: `npm test`
- **Cobertura**: 24 tests pasando ✅

## Notas Importantes
- La aplicación requiere que el backend my-store esté corriendo en localhost:3000
- Las credenciales por defecto se encuentran en el README del backend
- El carrito persiste entre recargas usando localStorage
- **Paleta de colores**: Emerald Soft (@theme block en `src/styles.css`)
  - Primary: `#A7C4A0` (emerald-soft)
  - Background: `#F5F5F5` (soft gray)
  - Text: `#333333` (dark gray)
  - Accent: `#2D5A27` (emerald-dark)

## Desarrollo con SDD (Spec-Driven Development)
Este proyecto utiliza metodología SDD para cambios estructurales:
- Ciclos completados: `emerald-soft-redesign`, `language-full-translation`
- Artifact store: Engram (persistencia entre sesiones)
- Para más información sobre SDD, consultar `.agents/README.md`
