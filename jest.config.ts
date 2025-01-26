/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  cacheDirectory: "C:\\Users\\jkatasi\\AppData\\Local\\Temp\\jest",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
  coverageProvider: "babel",
  coverageReporters: ["json", "text", "lcov", "clover"],
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node"],
  rootDir: "./",
  roots: ["<rootDir>"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],

  moduleNameMapper: {
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@application/(.*)$": "<rootDir>/src/application/$1",
    "^@infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
  },

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  testEnvironment: "node",
};

export default config;
