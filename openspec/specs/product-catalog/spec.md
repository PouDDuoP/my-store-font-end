# Product Catalog Specification

## Purpose

Display products fetched from the local my-store API with proper model alignment.

## Requirements

### Requirement: Fetch Products from Local API

The system SHALL fetch products from `/api/v1/products` (proxied to localhost:3000) instead of the external api.escuelajs.co API.

#### Scenario: Load products on app start

- GIVEN application initializes
- WHEN products are loaded
- THEN GET request is made to `/api/v1/products`
- AND response contains products from local backend

#### Scenario: Handle API errors

- GIVEN backend is unavailable
- WHEN products are requested
- THEN error message is displayed to user
- AND retry option is provided

### Requirement: Product Model Matches Backend Structure

The system SHALL use Product interface with fields matching the local backend: `name`, `image`, `createdAt`, `categoryId`.

#### Scenario: Product interface structure

- GIVEN application receives product from API
- THEN product has `name` field (not `title`)
- AND has `image` as string (not `images` array)
- AND has `createdAt` field (not `creationAt`)
- AND has `categoryId` as number (not `category` object)

#### Scenario: Display product in UI

- GIVEN product data is loaded
- WHEN product card is rendered
- THEN product displays `name` property
- AND displays single `image`
- AND date from `createdAt` is formatted correctly

### Requirement: Product Service Uses Local API

The system SHALL inject `HttpClient` using `inject()` function and make API calls to `/api/v1/products`.

#### Scenario: Service method calls correct endpoint

- GIVEN product.service.ts is used
- WHEN `getProducts()` is called
- THEN HTTP GET is made to `/api/v1/products`
- AND response is mapped to Product interface

#### Scenario: Service uses inject() pattern

- GIVEN product.service.ts is inspected
- THEN `http = inject(HttpClient)` is used
- AND NOT constructor injection pattern
