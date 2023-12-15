const request = require('supertest');
const app = require('../src/app');

describe('Server', () => {
  it('should be listening', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).not.toBe(404);
  });

  // Additional tests for server-specific behaviors
});
