const request = require('supertest');
const app = require('../src/app');

let server;

beforeAll(() => {
  server = app.listen(3000);
});

afterAll((done) => {
  server.close(done);
});

describe('Server', () => {
  it('should direct to API documentation at the root', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Welcome to the Calculator API.');
    expect(response.text).toContain('Visit <a href="/api-docs">API Documentation</a>');
  });
});
