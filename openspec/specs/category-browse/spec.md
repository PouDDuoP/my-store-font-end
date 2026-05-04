# Category Browse Specification

## Purpose

Browse and display product categories fetched from the local my-store API.

## Requirements

### Requirement: Fetch Categories from Local API

The system SHALL fetch categories from `/api/v1/categories` (proxied to localhost:3000) instead of the external api.escuelajs.co API.

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

#### Scenario: Service method calls correct endpoint

- GIVEN category.service.ts is used
- WHEN `getCategories()` is called
- THEN HTTP GET is made to `/api/v1/categories`
- AND response is mapped to Category interface

#### Scenario: Service uses inject() pattern
- GIVEN category.service.ts is inspected
- THEN `http = inject(HttpClient)` is used
- AND NOT constructor injection pattern

### Requirement: Category Filter UI

The system MUST display categories as clickable links in the product list sidebar. The active category MUST have a visual indicator (e.g., `underline`, `font-semibold`, or `bg-primary` highlight). Clicking a category MUST update the product list via `queryParams` or direct service call.

#### Scenario: Categories display as links

- GIVEN categories are loaded from the API
- WHEN the product list renders
- THEN each category MUST be displayed as a clickable link

#### Scenario: Active category shows indicator

- GIVEN the user clicks "Electronics" category
- WHEN the product list updates
- THEN "Electronics" link MUST have an active visual style (e.g., `font-semibold` or `underline`)

#### Scenario: "All" category is default active

- GIVEN the product list loads without a category filter
- WHEN the page renders
- THEN the "All" link MUST show the active visual style

#### Scenario: Clicking category filters products

- GIVEN categories exist and "Electronics" is clicked
- WHEN the click event fires
- THEN the product list MUST update to show only Electronics products

### Requirement: Category and Search Integration

The system MUST allow category filtering and text search to work together: selecting a category AND entering a search term MUST display products matching both criteria (category AND name contains search term).

#### Scenario: Category + search combo filters correctly

- GIVEN "Electronics" is selected and search term is "phone"
- WHEN both filters are active
- THEN only Electronics products with "phone" in the name MUST be displayed

#### Scenario: Clearing search preserves category

- GIVEN "Electronics" is selected with search term "phone"
- WHEN the search is cleared
- THEN all Electronics products MUST be displayed

### Requirement: Category Filter Accessibility

The system MUST ensure category links are keyboard focusable and have meaningful text. The active category MUST be identifiable by screen readers via `aria-current="page"` or similar.

#### Scenario: Category links are keyboard accessible

- GIVEN the category list is rendered
- WHEN user tabs through the list
- THEN each category link MUST receive focus

#### Scenario: Active category is announced to screen reader

- GIVEN "Electronics" is the active category
- WHEN a screen reader reads the category list
- THEN "Electronics" MUST be identified as the current category (e.g., `aria-current="true"`)
