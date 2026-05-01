# Delta for Category Browse

## MODIFIED Requirements

### Requirement: Fetch Categories from Local API

The system SHALL fetch categories from `/api/v1/categories` (proxied to localhost:3000) instead of the external api.escuelajs.co API.
(Previously: System fetched categories from https://api.escuelajs.co/api/v1/categories)

#### Scenario: Load categories on app start

- GIVEN application initializes
- WHEN categories are loaded
- THEN GET request is made to `/api/v1/categories`
- AND response contains categories from local backend

#### Scenario: Handle API errors

- GIVEN backend is unavailable
- WHEN categories are requested
- THEN error message is displayed to user
- AND retry option is provided

### Requirement: Category Model Matches Backend Structure

The system SHALL use Category interface with fields: `id`, `name`, `image`, `isActive`, `createdAt`.
(Previously: Category model may have had different structure without `image`, `isActive`, `createdAt`)

#### Scenario: Category interface structure

- GIVEN application receives category from API
- THEN category has `id`, `name` fields
- AND has `image` field as string
- AND has `isActive` boolean field
- AND has `createdAt` date field

#### Scenario: Display category in navigation

- GIVEN categories are loaded
- WHEN category list is rendered
- THEN each category displays `name`
- AND shows `image` thumbnail if available
- AND inactive categories (isActive=false) are visually distinct

### Requirement: Category Service Uses Local API

The system SHALL inject `HttpClient` using `inject()` function and make API calls to `/api/v1/categories`.
(Previously: Category service used api.escuelajs.co URL with constructor injection)

#### Scenario: Service method calls correct endpoint

- GIVEN category.service.ts is used
- WHEN `getCategories()` is called
- THEN HTTP GET is made to `/api/v1/categories`
- AND response is mapped to Category interface

#### Scenario: Service uses inject() pattern

- GIVEN category.service.ts is inspected
- THEN `http = inject(HttpClient)` is used
- AND NOT constructor injection pattern
