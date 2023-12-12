const request = require('supertest');
const app = require('../server');

describe('Server', () => {
  let server;

  beforeAll(() => {
    // Start the server before running tests
    server = app.listen(3000); // You can use a different port if needed
  });

  afterAll((done) => {
    // Close the server after all tests are done
    server.close(done);
  });

  it('should return a 200 status when the server is running', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  // Add more server-related tests as needed
});
