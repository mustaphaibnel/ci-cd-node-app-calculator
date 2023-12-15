const request = require('supertest');
const app = require('../src/app');

describe('App', () => {
  it('GET / should return the welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Welcome to the Calculator API');
  });
});
