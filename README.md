# My Store Frontend

Frontend Angular 21+ para la aplicación de comercio electrónico My Store.

## Tecnologías
- **Angular 21+** (Standalone components, Signals)
- **Tailwind CSS 4+** (Utility-first styling)
- **Jest** (Testing framework)
- **JWT Authentication** (with localStorage persistence)

## Características
- ✅ Lista de productos con filtro por categorías
- ✅ Detalle de producto con galería de imágenes
- ✅ Carrito de compras con persistencia (localStorage)
- ✅ Autenticación de usuarios (Login/Register)
- ✅ Perfil de usuario
- ✅ Diseño responsivo (Mobile-first)

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
- `npm test`: Ejecutar tests con Jest
- `npm run test:watch`: Tests en modo watch

## Estructura del Proyecto
```
src/
├── app/
│   ├── domains/
│   │   ├── shared/     # Componentes, servicios y modelos compartidos
│   │   ├── products/   # Páginas y componentes de productos
│   │   ├── info/       # Páginas de información (About, NotFound)
│   │   └── auth/       # Autenticación (login, register, profile)
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.component.ts
├── assets/
├── styles.css           # Tailwind CSS v4 imports
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

## Notas Importantes
- La aplicación requiere que el backend my-store esté corriendo en localhost:3000
- Las credenciales por defecto se encuentran en el README del backend
- El carrito persiste entre recargas usando localStorage
