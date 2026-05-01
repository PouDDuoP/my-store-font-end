# API Integration Specification

## Purpose

Integrate the Angular frontend with the local my-store backend API running at localhost:3000, using Angular proxy configuration for development.

## Requirements

### Requirement: Proxy Configuration

The system SHALL configure `proxy.conf.json` to route all `/api/**` requests to `http://localhost:3000` during development.

#### Scenario: Proxy routes API requests

- GIVEN Angular dev server is running with `--proxy-config proxy.conf.json`
- WHEN frontend makes request to `/api/v1/products`
- THEN request is proxied to `http://localhost:3000/api/v1/products`
- AND response is returned to frontend

#### Scenario: Non-API requests not proxied

- GIVEN Angular dev server is running
- WHEN frontend requests `/assets/logo.png`
- THEN request is served from Angular dev server
- AND NOT proxied to localhost:3000

### Requirement: Product API Endpoint

The system SHALL fetch products from `/api/v1/products` (proxied to localhost:3000) instead of the external api.escuelajs.co API.

#### Scenario: Fetch products from local API

- GIVEN backend is running at localhost:3000
- WHEN application loads products
- THEN GET request is made to `/api/v1/products`
- AND response contains products with `name`, `image`, `createdAt`, `categoryId` fields

#### Scenario: API error handling

- GIVEN backend is NOT running at localhost:3000
- WHEN application attempts to load products
- THEN error is caught and displayed to user
- AND retry mechanism is available

### Requirement: Category API Endpoint

The system SHALL fetch categories from `/api/v1/categories` (proxied to localhost:3000).

#### Scenario: Fetch categories from local API

- GIVEN backend is running at localhost:3000
- WHEN application loads categories
- THEN GET request is made to `/api/v1/categories`
- AND response contains categories with `id`, `name`, `image`, `isActive`, `createdAt` fields

### Requirement: Model Alignment

The system SHALL use updated interfaces that match the backend API structure.

#### Scenario: Product model structure

- GIVEN application receives product data from API
- THEN product object uses `name` field (not `title`)
- AND uses `image` field as string (not `images` array)
- AND uses `createdAt` field (not `creationAt`)
- AND includes `categoryId` as number (not `category` object)

#### Scenario: Category model structure

- GIVEN application receives category data from API
- THEN category object includes `image` field
- AND includes `isActive` boolean field
- AND includes `createdAt` date field
