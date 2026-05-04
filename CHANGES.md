# Changelog - My Store Frontend

Historial de cambios estructurales utilizando metodología SDD (Spec-Driven Development).

---

## [2026-05-03] - Sistema de Traducciones i18n Completo

### Ciclo SDD: `language-full-translation` ✅ ARCHIVADO
**Modo**: Automático (auto)  
**Artifact Store**: Engram

#### Implementado:
- **TranslatePipe** (impure pipe) en `src/app/domains/shared/pipes/translate.pipe.ts`
  - `pure: false` para reactividad automática a cambios de `currentLang` signal
  - Soporte para interpolación de parámetros: `{{ 'key' | translate:{param: value} }}`
  - Fallback: retorna la clave misma si no encuentra traducción

- **LanguageService mejorado** en `src/app/domains/shared/services/language.service.ts`
  - Método `translate(key, params?)` para uso en componentes
  - Carga temprana de JSONs via HttpClient (`enTranslations`, `esTranslations` signals)
  - Toggle de idioma EN ↔ ES con persistencia

- **Archivos de idioma** (58 claves cada uno):
  - `src/assets/i18n/en.json` - Inglés
  - `src/assets/i18n/es.json` - Español
  - Estructura anidada: `nav.*`, `auth.*`, `products.*`, `cart.*`, `common.*`, `about.*`, `profile.*`, `search.*`, `product.*`, `check-out.*`, `language.*`

- **15+ plantillas actualizadas** con sintaxis `{{ 'key' | translate }}`
  - Header, Footer, ProductList, ProductDetail, Auth forms, About, Profile, etc.

- **Cambio de "Email" a "User"** en formularios de autenticación
  - `auth-form.component.html` actualizado
  - Claves `auth.email` renombradas a `auth.user`

- **Página /cart creada** - Fix error 404
  - Componente: `src/app/domains/shared/pages/cart/cart.component.ts`
  - Ruta agregada en `app.routes.ts`
  - Diseño coherente con el sidebar del carrito

- **Fix bug en About page**
  - Texto hardcodeado "Número de Clientes activos" → clave de traducción

#### Testing:
- ✅ 24/24 tests pasando
- ✅ `npm run build` exitoso

#### Archivos Modificados/Creados:
```
src/app/domains/shared/pipes/translate.pipe.ts (NUEVO)
src/app/domains/shared/services/language.service.ts (MEJORADO)
src/assets/i18n/en.json (EXPANDED - 58 claves)
src/assets/i18n/es.json (EXPANDED - 58 claves)
src/app/domains/shared/pages/cart/cart.component.ts (NUEVO)
src/app/app.routes.ts (ACTUALIZADO)
src/app/domains/auth/components/auth-form/auth-form.component.html (ACTUALIZADO)
src/app/domains/info/pages/about/about.component.html (FIX)
+ 15 plantillas adicionales con traducciones
```

---

## [2026-05-01] - Rediseño Emerald Soft + Base i18n

### Ciclo SDD: `emerald-soft-redesign` ✅ ARCHIVADO
**Modo**: Interactivo  
**Artifact Store**: Engram

#### Implementado:
- **Paleta de colores Emerald Soft** en `src/styles.css`
  - Primary: `#A7C4A0` (emerald-soft)
  - Background: `#F5F5F5` (soft gray)
  - Text: `#333333` (dark gray)
  - Accent: `#2D5A27` (emerald-dark)
  - Implementado con `@theme` block (Tailwind CSS v4)

- **Header actualizado** con nueva paleta
  - Clases: `bg-emerald-dark`, `border-accent`, `text-emerald-soft`
  - Botones: `btn-emerald`, `btn-secondary`

- **Fix scroll en página 404**
  - `overflow` issues resueltos en NotFound component

- **Language Switcher básico** (Fase 1)
  - Botón EN/ES en header
  - Toggle básico de idioma (base para sistema completo en `language-full-translation`)

#### Archivos Modificados:
```
src/styles.css (NUEVO - @theme block con 10 tokens)
src/app/domains/shared/components/header/header.component.ts (ACTUALIZADO)
src/app/domains/shared/components/header/header.component.html (ACTUALIZADO)
src/app/domains/shared/components/header/header.component.css (ACTUALIZADO)
src/app/domains/info/pages/not-found/not-found.component.ts (FIX)
```

---

## [Pre-SDD] - Aplicación Base

### Funcionalidad Core:
- ✅ Lista de productos con filtro por categorías
- ✅ Detalle de producto con galería de imágenes (ImageCarousel)
- ✅ Carrito de compras con persistencia (localStorage)
- ✅ Autenticación JWT (Login/Register/Profile)
- ✅ Diseño responsivo (Mobile-first)
- ✅ Proxy a backend en `localhost:3000`
- ✅ Testing con Jest (configuración base)

### Estructura Técnica:
- **Angular 21+** con Standalone Components
- **Signals** para estado reactivo
- **Tailwind CSS 4+** para estilos
- **Arquitectura por dominios** (`domains/shared`, `domains/products`, `domains/auth`, `domains/info`)

---

## Notas de Desarrollo

### Metodología SDD
Los cambios estructurales se gestionan mediante ciclos SDD:
1. **Explore** → Investigación y análisis
2. **Propose** → Propuesta de cambio
3. **Spec** → Especificaciones detalladas
4. **Design** → Diseño técnico
5. **Tasks** → Desglose en tareas
6. **Apply** → Implementación (en lotes si es necesario)
7. **Verify** → Validación contra especificaciones
8. **Archive** → Archivo y persistencia

### Artifact Store
- **Engram**: Persistencia entre sesiones (default)
- **openspec**: Archivos en disco (`.agents/changes/`)
- **hybrid**: Ambos (para recuperación + compartir)

---

**Última actualización**: 2026-05-03  
**Mantenido por**: SDD Orchestrator (big-pickle model)
