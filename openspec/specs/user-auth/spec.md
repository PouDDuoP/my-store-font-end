# User Auth Specification

## Purpose

JWT-based authentication system with login, register, profile management, and route protection for the my-store frontend.

## Requirements

### Requirement: User Login

The system SHALL allow users to authenticate using email and password credentials via POST `/api/v1/auth/login`. Upon successful authentication, the system SHALL store the JWT token in localStorage and update the reactive auth state.

#### Scenario: Successful login

- GIVEN user is on login page
- WHEN valid email and password are submitted
- THEN JWT token is stored in localStorage
- AND auth state signal is updated with user data
- AND user is redirected to home page

#### Scenario: Invalid credentials

- GIVEN user is on login page
- WHEN invalid email or password are submitted
- THEN error message is displayed
- AND no token is stored
- AND user remains on login page

#### Scenario: JWT injection on authenticated requests

- GIVEN user has valid JWT in localStorage
- WHEN any API request is made
- THEN AuthInterceptor SHALL inject `Authorization: Bearer {token}` header
- AND request proceeds normally

### Requirement: User Registration

The system SHALL allow new users to register with name, email, and password via POST `/api/v1/auth/register`.

#### Scenario: Successful registration

- GIVEN user is on register page
- WHEN valid name, email, and password are submitted
- THEN user account is created
- AND success message is displayed
- AND user is redirected to login page

#### Scenario: Duplicate email registration

- GIVEN user is on register page
- WHEN an existing email is submitted
- THEN error message indicates email already exists
- AND registration form remains populated

### Requirement: Route Protection

The system SHALL prevent unauthenticated users from accessing protected routes using AuthGuard.

#### Scenario: Access protected route while unauthenticated

- GIVEN user is not logged in (no valid JWT)
- WHEN user navigates to `/profile` or other protected route
- THEN user is redirected to `/login`
- AND return URL is preserved for post-login redirect

#### Scenario: Access protected route while authenticated

- GIVEN user has valid JWT in localStorage
- WHEN user navigates to `/profile`
- THEN profile page loads normally
- AND user data is fetched from API

### Requirement: Password Recovery

The system SHALL allow users to request password recovery via POST `/api/v1/auth/recovery`.

#### Scenario: Valid recovery request

- GIVEN user is on login page
- WHEN user clicks "Forgot password" and enters valid email
- THEN recovery email is sent (simulated)
- AND confirmation message is displayed

#### Scenario: Invalid recovery request

- GIVEN user is on recovery page
- WHEN non-existent email is submitted
- THEN error message indicates email not found

### Requirement: Password Change

The system SHALL allow authenticated users to change their password via POST `/api/v1/auth/change-password`.

#### Scenario: Successful password change

- GIVEN user is authenticated and on profile page
- WHEN current password and new password are submitted correctly
- THEN password is updated successfully
- AND success message is displayed

#### Scenario: Incorrect current password

- GIVEN user is authenticated and on profile page
- WHEN incorrect current password is submitted
- THEN error message indicates current password is invalid
