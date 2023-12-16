const request = require('supertest');
const mockStart = jest.fn();
const mockElasticApm = { start: mockStart };

// Mock the 'elastic-apm-node' module
jest.mock('elastic-apm-node', () => mockElasticApm);

describe('Elastic APM Initialization', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockStart.mockClear();
  });

  it('should initialize Elastic APM when ELASTIC_APM_ACTIVE is true', () => {
    // Set the environment variable ELASTIC_APM_ACTIVE to 'true'
    process.env.ELASTIC_APM_ACTIVE = 'true';

    // Import your app.js (which will trigger the initialization)
    const app = require('../src/app');

    // Assert that the 'start' function was called with the correct parameters
    expect(mockStart).toHaveBeenCalledTimes(1);
    expect(mockStart).toHaveBeenCalledWith({
      serviceName: process.env.APM_SERVICE_NAME || 'default-service-name',
      secretToken: process.env.APM_SECRET_TOKEN || '',
      serverUrl: process.env.APM_SERVER_URL || 'http://localhost:8200',
      environment: process.env.APM_ENVIRONMENT || 'production',
    });
  });

  it('should not initialize Elastic APM when ELASTIC_APM_ACTIVE is not true', () => {
    // Ensure that ELASTIC_APM_ACTIVE is not set or set to any value other than 'true'
    delete process.env.ELASTIC_APM_ACTIVE;

    // Import your app.js (which should not trigger the initialization)
    const app = require('../src/app');

    // Assert that the 'start' function was not called
    expect(mockStart).not.toHaveBeenCalled();
  });

  afterEach(() => {
    // Reset the environment variable after each test
    delete process.env.ELASTIC_APM_ACTIVE;
  });
});
