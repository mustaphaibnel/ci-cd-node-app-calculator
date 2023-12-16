// Test for Elastic APM integration in app.js

const request = require('supertest');
const mockStart = jest.fn();
jest.mock('elastic-apm-node', () => ({
  start: mockStart
}));

describe('Elastic APM', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockStart.mockClear();
  });

  it('should start the APM agent if ELASTIC_APM_ACTIVE is true', () => {
    process.env.ELASTIC_APM_ACTIVE = 'true';
    process.env.APM_SERVICE_NAME = 'test-service';
    process.env.APM_SECRET_TOKEN = 'test-secret';
    process.env.APM_SERVER_URL = 'http://localhost:8200';
    process.env.APM_ENVIRONMENT = 'test';

    // The following line requires your app, which should, in turn, start the APM agent.
    const app = require('../src/app');

    expect(mockStart).toHaveBeenCalled();
    expect(mockStart).toHaveBeenCalledWith({
      serviceName: 'test-service',
      secretToken: 'test-secret',
      serverUrl: 'http://localhost:8200',
      environment: 'test',
    });
  });

  it('should not start the APM agent if ELASTIC_APM_ACTIVE is not true', () => {
    delete process.env.ELASTIC_APM_ACTIVE;
    const app = require('../src/app');

    expect(mockStart).not.toHaveBeenCalled();
  });
});
