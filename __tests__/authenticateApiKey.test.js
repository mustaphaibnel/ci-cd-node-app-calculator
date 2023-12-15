// __tests__/authenticateApiKey.test.js
const httpMocks = require('node-mocks-http');
const authenticateApiKey = require('../src/middlewares/authenticateApiKey');

describe('authenticateApiKey Middleware', () => {
  it('should return 401 for invalid or missing API key', () => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/v1/calculator/add',
      headers: {
        'X-API-Key': 'invalidKey'
      }
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    authenticateApiKey(req, res, next);

    expect(res.statusCode).toBe(401);
    const data = JSON.parse(res._getData());
    expect(data.message).toBe("Unauthorized"); // Corrected this line
    expect(next).not.toHaveBeenCalled();
  });

  // Additional test for valid API key
});
