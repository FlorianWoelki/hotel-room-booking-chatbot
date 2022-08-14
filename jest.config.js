/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setupTests.ts'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/svg.js',
  },
};
