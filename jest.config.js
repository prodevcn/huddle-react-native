module.exports = {
  preset: '@testing-library/react-native',
  setupFilesAfterEnv: [
    '<rootDir>jest/setupTests.js',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/e2e',
  ],
};
