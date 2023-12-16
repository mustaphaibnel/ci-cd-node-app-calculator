const request = require('supertest');
const express = require('express');
const swaggerSetup = require('../src/config/swaggerSetup');

describe('Swagger Documentation Setup', () => {
  let app;

  beforeEach(() => {
    app = express();
    swaggerSetup(app); // Apply your Swagger setup to the Express app instance
  });

  it('should serve the Swagger UI at /api-docs', async () => {
    const response = await request(app).get('/api-docs');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Swagger UI');
    // You might want to check for specific HTML elements that are unique to the Swagger UI page
  });

  it('should have the correct host in the Swagger document', async () => {
    const response = await request(app).get('/api-docs/swagger.json');
    const swaggerDoc = JSON.parse(response.text);
    expect(swaggerDoc.host).toBe('example.com'); // Replace 'example.com' with the expected host
  });
});
