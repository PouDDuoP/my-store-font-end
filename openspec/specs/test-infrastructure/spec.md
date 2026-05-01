# Test Infrastructure Specification

## Purpose

Migrate the testing framework from Karma/Jasmine to Jest with jest-preset-angular, enabling modern test patterns and faster execution.

## Requirements

### Requirement: Jest Configuration

The system SHALL use Jest as the test runner with jest-preset-angular for Angular support.

#### Scenario: Run tests with Jest

- GIVEN project has Jest and jest-preset-angular installed
- WHEN `ng test` or `npm test` is executed
- THEN Jest runs all `*.spec.ts` files
- AND test results are displayed in terminal

#### Scenario: Angular.json uses Jest builder

- GIVEN angular.json is configured
- WHEN inspecting test configuration
- THEN builder is `@angular-builders/jest:run` or equivalent Jest builder
- AND NOT `@angular-devkit/build-angular:karma`

### Requirement: Test File Compatibility

The system SHALL support existing test patterns migrated to Jest syntax.

#### Scenario: Describe/it test blocks work

- GIVEN a test file uses `describe()` and `it()` blocks
- WHEN Jest runs the test
- THEN tests execute correctly
- AND assertions using `expect()` pass or fail appropriately

#### Scenario: Mock injection works

- GIVEN a test needs to mock a service
- WHEN using `jest.mock()` or `TestBed.overrideProvider()`
- THEN mocked service is used during test execution

#### Scenario: Async testing works

- GIVEN a test involves async operations (HTTP, timers)
- WHEN using `fakeAsync()`, `tick()`, or `waitForAsync()`
- THEN async operations complete within test
- AND assertions run after async completion

### Requirement: Remove Karma/Jasmine

The system SHALL NOT include Karma or Jasmine dependencies after migration.

#### Scenario: No Karma dependencies

- GIVEN package.json is inspected
- THEN `karma`, `karma-chrome-launcher`, `karma-jasmine` are NOT present
- AND `jasmine-core` is NOT present

#### Scenario: No karma.conf.js

- GIVEN project root is inspected
- THEN `karma.conf.js` file does NOT exist

### Requirement: Test Coverage

The system SHOULD generate test coverage reports using Jest's built-in coverage.

#### Scenario: Coverage report generation

- GIVEN `npm test -- --coverage` is executed
- WHEN tests complete
- THEN coverage report is generated in `coverage/` directory
- AND summary shows percentage of code covered
