# Cart Persistence Specification

## Purpose

Persist shopping cart state across browser sessions using localStorage, with reactive state management via Angular Signals.

## Requirements

### Requirement: Cart State Persistence

The system SHALL persist cart items to localStorage and restore them when the application loads or page reloads.

#### Scenario: Add item persists across reload

- GIVEN user has an empty cart
- WHEN user adds a product to cart
- THEN cart contains the product
- AND cart data is saved to localStorage
- WHEN page reloads
- THEN cart restores the saved product from localStorage

#### Scenario: Remove item persists across reload

- GIVEN cart has items persisted in localStorage
- WHEN user removes an item from cart
- THEN item is removed from cart
- AND localStorage is updated
- WHEN page reloads
- THEN cart does not contain the removed item

#### Scenario: Clear cart persists

- GIVEN cart has items persisted in localStorage
- WHEN user clears the entire cart
- THEN cart is empty
- AND localStorage is cleared for cart key
- WHEN page reloads
- THEN cart remains empty

### Requirement: Cart Data Structure

The system SHALL store cart data in localStorage with the key `my-store-cart` as a JSON array of cart items.

#### Scenario: Valid localStorage structure

- GIVEN user adds items to cart
- WHEN inspecting localStorage `my-store-cart` key
- THEN value is valid JSON array
- AND each item contains `productId`, `title`, `price`, `quantity`, `image`

#### Scenario: Corrupted localStorage handling

- GIVEN localStorage `my-store-cart` contains invalid JSON
- WHEN application loads
- THEN cart initializes as empty array
- AND corrupted data is cleared from localStorage

### Requirement: Reactive Cart State

The system SHALL use Angular Signals to provide reactive cart state that updates UI components automatically.

#### Scenario: Signal updates trigger UI refresh

- GIVEN user is viewing cart component
- WHEN item is added to cart via signal update
- THEN cart UI refreshes to show new item
- AND total price updates automatically

#### Scenario: Cart count in header

- GIVEN user is viewing any page with header
- WHEN cart items change via signal
- THEN header cart icon badge updates with total item count
