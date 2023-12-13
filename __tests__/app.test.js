const request = require('supertest');
const app = require('../src/app');

describe('Calculator API', () => {
  test('adds two numbers', async () => {
    const response = await request(app).post('/add').send({ a: 5, b: 3 });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(8);
  });

  test('subtracts two numbers', async () => {
    const response = await request(app).post('/subtract').send({ a: 10, b: 4 });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(6);
  });

  test('multiplies two numbers', async () => {
    const response = await request(app).post('/multiply').send({ a: 7, b: 6 });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(42);
  });

  test('divides two numbers', async () => {
    const response = await request(app).post('/divide').send({ a: 20, b: 4 });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(5);
  });

  test('handles division by zero', async () => {
    const response = await request(app).post('/divide').send({ a: 15, b: 0 });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Additional tests for edge cases
  test('adds two negative numbers', async () => {
    const response = await request(app).post('/add').send({ a: -5, b: -3 });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(-8);
  });

  test('subtracts with negative result', async () => {
    const response = await request(app).post('/subtract').send({ a: 4, b: 10 });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(-6);
  });

  test('multiplies with a zero', async () => {
    const response = await request(app).post('/multiply').send({ a: 0, b: 6 });
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(0);
  });

  // Test for invalid inputs
  test('handles invalid inputs', async () => {
    const response = await request(app).post('/add').send({ a: 'invalid', b: 3 });
    expect(response.statusCode).toBe(400); // Assuming you handle invalid inputs with 400 status
  });
});
