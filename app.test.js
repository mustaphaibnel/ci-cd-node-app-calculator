const request = require('supertest');
const app = require('../app');

describe('Calculator API', () => {
  test('adds two numbers', async () => {
    const response = await request(app).post('/add').send({ a: 5, b: 3 });
    expect(response.body.result).toBe(8);
  });

  test('subtracts two numbers', async () => {
    const response = await request(app).post('/subtract').send({ a: 10, b: 4 });
    expect(response.body.result).toBe(6);
  });

  test('multiplies two numbers', async () => {
    const response = await request(app).post('/multiply').send({ a: 7, b: 6 });
    expect(response.body.result).toBe(42);
  });

  test('divides two numbers', async () => {
    const response = await request(app).post('/divide').send({ a: 20, b: 4 });
    expect(response.body.result).toBe(5);
  });

  test('handles division by zero', async () => {
    const response = await request(app).post('/divide').send({ a: 15, b: 0 });
    expect(response.statusCode).toBe(400);
  });
});
