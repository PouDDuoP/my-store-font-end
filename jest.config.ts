import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/src/app/domains/shared/$1',
    '^@products/(.*)$': '<rootDir>/src/app/domains/products/$1',
    '^@info/(.*)$': '<rootDir>/src/app/domains/info/$1',
    '^@auth/(.*)$': '<rootDir>/src/app/domains/auth/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

export default config;
