const request = require('supertest');
const app = require('../src/app');

describe('Calculator Routes', () => {
  const validApiKey = process.env.EXPECTED_API_KEY

  describe.each([
    { route: '/add', operation: (a, b) => a + b },
    { route: '/subtract', operation: (a, b) => a - b },
    { route: '/multiply', operation: (a, b) => a * b },
    { route: '/divide', operation: (a, b) => a / b },
  ])('$route', ({ route, operation }) => {
    const a = 5, b = 3;

    it(`should perform the ${route.substring(1)} operation with a valid API key`, async () => {
      const response = await request(app)
        .post(`/api/v1/calculator${route}`)
        .set('X-API-Key', validApiKey)
        .send({ a, b });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ result: operation(a, b) });
    });

    it(`should return 401 Unauthorized without a valid API key for ${route}`, async () => {
      const response = await request(app)
        .post(`/api/v1/calculator${route}`)
        .send({ a, b });
      expect(response.statusCode).toBe(401);
    });
  });
});
