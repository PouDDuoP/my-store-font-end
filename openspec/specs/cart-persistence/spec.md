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

### Requirement: Cart Sidebar Product Display

The system MUST display cart items in the sidebar with: product thumbnail image (48x48px), product name, product price, and a remove button (`×`) per item. The sidebar MUST have a max-height with overflow scroll when containing many items.

#### Scenario: Cart with items shows thumbnails and details

- GIVEN the cart contains 2 products
- WHEN the sidebar opens
- THEN each item MUST show a 48x48 thumbnail, name, price, and remove button

#### Scenario: Empty cart displays message

- GIVEN the cart is empty
- WHEN the sidebar opens
- THEN a "Your cart is empty" message MUST be displayed

#### Scenario: Cart with many items is scrollable

- GIVEN the cart contains 20+ products
- WHEN the sidebar opens
- THEN the cart list MUST be scrollable with `max-height` and `overflow-y-auto`

#### Scenario: Remove button removes item

- GIVEN the cart contains a product "Apple"
- WHEN the remove button for "Apple" is clicked
- THEN "Apple" MUST be removed from the cart and the total MUST update

#### Scenario: Cart images have alt text

- GIVEN a cart item displays a thumbnail
- WHEN a screen reader reads the image
- THEN the image MUST have `alt` attribute set to the product name

### Requirement: Cart Total Display

The system MUST display the cart total prominently below the item list, formatted as currency.

#### Scenario: Cart total updates dynamically

- GIVEN cart contains items priced at $10 and $20
- WHEN the sidebar renders
- THEN the total MUST display $30 (or locale-formatted equivalent)

### Requirement: Cart Persistence Behavior Unchanged

The system MUST preserve existing behavior: cart state persists in localStorage under `my-store-cart`, add/remove/clear operations work via `CartService`, and total is computed reactively.

#### Scenario: Cart persists after page reload

- GIVEN a product was added to the cart
- WHEN the page reloads
- THEN the cart MUST contain the added product

#### Scenario: Adding product increases cart count

- GIVEN the cart is empty
- WHEN a product is added via `addToCart()`
- THEN the cart signal MUST update and the header badge MUST increment
