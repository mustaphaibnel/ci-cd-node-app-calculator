const request = require('supertest');
const app = require('../src/app');

describe('User Routes', () => {
  const validApiKey = process.env.EXPECTED_API_KEY;

  it('should validate the API key with a valid key', async () => {
    const response = await request(app)
      .get('/users/validateToken')
      .set('X-API-Key', validApiKey);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'API key is valid' });
  });

  it('should return 401 Unauthorized without a valid API key', async () => {
    const response = await request(app)
      .get('/users/validateToken');

    expect(response.statusCode).toBe(401);
  });
});
