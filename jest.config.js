// jest.config.js
module.exports = {
  testEnvironment: 'node', // This is important for running tests in Node.js environment
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary', 'lcov'], // Add 'lcov' here
  setupFiles: ['<rootDir>/jest.setup.js'],
};
