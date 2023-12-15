const httpMocks = require('node-mocks-http');
const arithmeticMiddleware = require('../src/middlewares/arithmeticMiddleware');

describe('arithmeticMiddleware', () => {
  it('should return 400 for invalid numeric inputs', () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/v1/calculator/add',
      body: { a: 'invalid', b: 3 }
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    arithmeticMiddleware(req, res, next);

    expect(res.statusCode).toBe(400);
    const data = JSON.parse(res._getData());
    expect(data.error).toBe('Invalid input: Inputs must be numbers.');
    expect(next).not.toHaveBeenCalled();
  });

  // Additional tests for division by zero and valid inputs
});
