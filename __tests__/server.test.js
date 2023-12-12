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
  it('should return "Hello from server" at the root', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello from server');
  });
});
